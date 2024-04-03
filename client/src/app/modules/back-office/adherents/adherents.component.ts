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
        this.membres = response.members;
      },
      error => {
        console.error('Erreur lors de la récupération des membres :', error);
        this.notificationService.setNotification('Erreur lors de la récupération des membre');

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
        this.notificationService.setNotification('Erreur lors de la suppression du membre');
        console.error('Erreur lors de la suppression du membre :', error);
      }
    );
  }
}
