import { NotificationService } from './../notification-banner/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from '../../../services/memberService/member-service.service';

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrl: './adherents.component.scss'
})
export class AdherentsComponent implements OnInit {
  membres: any[] = [];
  deleting: boolean = false;

  constructor(private memberService: MemberServiceService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(): void {
    this.memberService.getAllMembers().subscribe(
      response => {
        this.membres = response.members.map(membre => ({ ...membre, editMode: false }));
      },
      error => {
        console.error('Erreur lors de la récupération des membres :', error);
        this.notificationService.setNotification('Erreur lors de la récupération des membre');

      }
    );
  }

  toggleEditMode(membre: any) {
    membre.editMode = !membre.editMode;
  }

  cancelEdit(membre: any) {
    membre.editMode = false;

  }

  updateMember(membre: any) {
    this.memberService.updateMember(membre._id, membre).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de l'adhérent ont été mises à jour avec succès. \u2713");
        membre.editMode = false;

      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de l\'adhérent. \u2613');
        console.error('Erreur lors de la mise à jour du membre :', error);
      }
    );
  }

  deleteMember(membre: any) {
    this.memberService.deleteMember(membre._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cet adhérents a bien été supprimé des membres du Cac \u2713");
        this.membres = this.membres.filter(m => m._id !== membre._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression du membre \u2613');
        console.error('Erreur lors de la suppression du membre :', error);
      }
    );
  }
}
