import { Component, ElementRef } from '@angular/core';
import { MediationService } from '../../../services/mediationService/mediation.service';
import { Mediation, MediationResponse } from '../../../interfaces/mediation.interface';
import { OnInit } from '@angular/core';
import { IdService } from '../../../services/idService/Id.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mediation',
  templateUrl: './mediation.component.html',
  styleUrl: './mediation.component.scss'
})


export class MediationComponent implements OnInit{
  mediation: Mediation[] = [];

  constructor(private mediationService: MediationService, private el: ElementRef, private idService: IdService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mediationService.getAllMediation().subscribe((data: MediationResponse) => {
      if (data && Array.isArray(data.mediationData)) {
        this.mediation = data.mediationData.map((mediation: Mediation) => ({
          ...mediation,
          image: 'http://localhost:5000/' + mediation.image.replace(/\\/g, '/')
        }));
      }
    });
  }
  navigateToDetail(mediationId: string, title: string) {
    this.idService.setId(mediationId);
    console.log(mediationId, title);
      this.router.navigate(['/mediation', title]);
      console.log('navigateToDetail called with', mediationId, title);
    }
}
