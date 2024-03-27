import { Component, ElementRef } from '@angular/core';
import { MediationService } from '../../services/mediationService/mediation.service';
import { Mediation } from '../../interfaces/mediation.interface';

@Component({
  selector: 'app-mediation',
  templateUrl: './mediation.component.html',
  styleUrl: './mediation.component.scss'
})


export class MediationComponent {
  mediation: Mediation[] = [];



  constructor(private mediationService: MediationService, private el: ElementRef) { }

  ngOnInit(): void {
    this.mediationService.getAllMediation().subscribe(data => {
      if (data && Array.isArray(data.mediationData)) {
        this.mediation = data.mediationData.map((mediation: Mediation) => ({
          ...mediation,
          image: 'http://localhost:5000/' + mediation.image.replace(/\\/g, '/')
        }));
      }
    });
  }
}
