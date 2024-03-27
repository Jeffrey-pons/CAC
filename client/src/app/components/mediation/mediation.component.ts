import { Component, ElementRef } from '@angular/core';
import { MediationService } from '../../services/mediationService/mediation.service';
import { Mediation, MediationResponse } from '../../interfaces/mediation.interface';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-mediation',
  templateUrl: './mediation.component.html',
  styleUrl: './mediation.component.scss'
})


export class MediationComponent implements OnInit{
  mediation: Mediation[] = [];

  constructor(private mediationService: MediationService, private el: ElementRef) { }

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
}
