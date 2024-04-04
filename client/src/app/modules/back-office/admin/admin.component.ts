import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-banner/services/notification.service';
import { AdminService } from '../../../services/adminService/admin.service';
import { AdminResponse } from '../../../interfaces/admin.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  admins: any[] = [];
  newAdmin: any = {};
  deleting: boolean = false;
  showAddForm: boolean = false;

  constructor(private adminService: AdminService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  createAdmin() {
    this.adminService.createAdmin(this.newAdmin).subscribe(
      (response) => {
        this.notificationService.setNotification("L'administrateur a été créé avec succès. \u2713");
        this.admins.push(response.newAdmin);
        this.newAdmin = {};
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la création de l\'administrateur. \u2613');
        console.error('Erreur lors de la création de l\'administrateur :', error);
      }
    );
  }


  getAllAdmins(): void {
    this.adminService.getAllAdmins().subscribe(
      (response: AdminResponse) => {
        if (response && response.adminData && response.adminData.length > 0) {
          this.admins = response.adminData.map(admin => ({ ...admin, editMode: false }));
        } else {
          this.admins = [];
        }
      },
      error => {
        console.error('Erreur lors de la récupération des admins :', error);
        this.notificationService.setNotification('Erreur lors de la récupération des admins \u2613');
      }
    );
  }

  toggleEditMode(admin: any) {
    admin.editMode = !admin.editMode;
  }

  cancelEdit(admin: any) {
    admin.editMode = false;
  }

  updateAdmin(admin: any) {
    const { password, ...adminData } = admin;
    this.adminService.updateAdmin(admin._id, adminData).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de l'admin ont été mises à jour avec succès. \u2713");
        admin.editMode = false;

      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de l\'admin. \u2613');
        console.error('Erreur lors de la mise à jour de l\'admin :', error);
      }
    );
  }

  deleteAdmin(admin: any) {
    this.adminService.deleteAdmin(admin._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cet admin a bien été supprimé des admins du Cac \u2713");
        this.admins = this.admins.filter(a => a._id !== admin._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression de l\'admin. \u2613');
        console.error('Erreur lors de la suppression de l\'admin :', error);
      }
    );
  }
}
