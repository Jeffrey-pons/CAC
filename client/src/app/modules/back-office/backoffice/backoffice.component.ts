import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification-banner/services/notification.service';
import { MediationService } from '../../../services/mediationService/mediation.service';
import { Mediation, MediationResponse } from '../../../interfaces/mediation.interface';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.scss'
})
export class BackofficeComponent implements OnInit {
  mediations: Mediation[] = [];
  newMediation: any = {};

  constructor(
    private mediationService: MediationService, 
    public notificationService: NotificationService) {}


    // Mediation CRUD operations
  ngOnInit(): void {
    this.getAllMediations();
  }

  createMediation(mediation: Mediation) {
    this.mediationService.createMediation(mediation).subscribe(
      (response: MediationResponse) => {
        this.notificationService.setNotification("La nouvelle médiation a été créée avec succès. \u2713");
        if (response && response.mediationData && Array.isArray(response.mediationData)) {
          this.mediations.push(...response.mediationData);
          this.newMediation = {}
        }
        this.getAllMediations();
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la création de la nouvelle médiation. \u2613');
        console.error('Erreur lors de la création de la nouvelle médiation :', error);
      }
    );
  }

  handleFileInputMediation(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newMediation.image = file;
  }
 
  getAllMediations(): void {
    this.mediationService.getAllMediation().subscribe(
      (response: MediationResponse) => {
        if (response && response.mediationData && Array.isArray(response.mediationData)) {
          this.mediations = response.mediationData.map((mediations: Mediation) => ({
            ...mediations, 
            editMode: false,
            image: 'http://localhost:5000/' +  mediations.image.replace(/\\/g, '/')
          }));
        }
      },
      error => {
        console.error('Erreur lors de la récupération des médiations :', error);
      }
    );
  }

  toggleEditModeMediation(mediation: any) {
    mediation.editMode = !mediation.editMode;
  }

  cancelEditMediation(mediation: any) {
    mediation.editMode = false;
  }

  updateMediation(mediation: Mediation) {
    this.mediationService.updateMediation(mediation._id, mediation).subscribe(
      () => {
        this.notificationService.setNotification("Les informations de la médiation ont été mises à jour avec succès. \u2713");
        mediation.editMode = false;
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la mise à jour des informations de la médiation. \u2613');
        console.error('Erreur lors de la mise à jour de la médiation :', error);
      }
    );
  }

  deleteMediation(mediation: any) {
    this.mediationService.deleteMediation(mediation._id).subscribe(
      () => {
        this.notificationService.setNotification(" Cette médiation a bien été supprimé des médiations du Cac \u2713");
        this.mediations = this.mediations.filter(m => m._id !== mediation._id);
      },
      error => {
        this.notificationService.setNotification('Erreur lors de la suppression de la médiation. \u2613');
        console.error('Erreur lors de la suppression de la médiation :', error);
      }
    );
  }
}
