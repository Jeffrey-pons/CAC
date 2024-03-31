import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediationService } from '../../../services/mediationService/mediation.service';
import { Mediation, MediationResponse } from '../../../interfaces/mediation.interface';
import { IdService } from '../../../services/idService/Id.service';

@Component({
  selector: 'app-mediation-details',
  templateUrl: './mediation-details.component.html',
  styleUrls: ['./mediation-details.component.scss']
})
export class MediationDetailsComponent implements OnInit, OnDestroy {
  mediation: Mediation | any = null;

  constructor(private mediationService: MediationService, private route: ActivatedRoute, private idService: IdService) { }

  ngOnInit(): void {
    const id = this.idService.getId();
    if (id) {
      this.mediationService.getMediationById(id).subscribe((data: any) => { // Change MediationResponse to any
        if (data.mediation) {
          const mediation = data.mediation;
          this.mediation = {
            ...mediation,
            image: 'http://localhost:5000/' + mediation.image.replace(/\\/g, '/')
          }
        }
      }, (error) => {
        console.error('Error:', error);
      });
    }
  }

  ngOnDestroy(): void {
    this.idService.setId('');
  }
}