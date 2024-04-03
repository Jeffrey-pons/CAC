import { Component, OnInit } from '@angular/core';
import { MemberServiceService } from '../../../services/memberService/member-service.service';

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrl: './adherents.component.scss'
})
export class AdherentsComponent implements OnInit {
  membres: any[] = [];

  constructor(private memberService: MemberServiceService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(): void {
    this.memberService.getAllMembers().subscribe(
      (membres) => {
        this.membres = membres;
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des membres :', error);
      }
    );
  }
}
