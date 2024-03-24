import { Component } from '@angular/core';
import { NextExpoServiceService } from '../../services/nextExpoService/next-expo-service.service';

@Component({
  selector: 'app-nextexposition',
  templateUrl: './nextexposition.component.html',
  styleUrl: './nextexposition.component.scss'
})
export class NextexpositionComponent {
  nextExpositions: any[] = [];
  allSameYear: boolean = false;

  constructor(private nextExpoService: NextExpoServiceService) { }

  ngOnInit(): void {
    this.nextExpoService.getNextExpo().subscribe(data => {
      if (data && Array.isArray(data.nextExpoData)) {
        this.nextExpositions = data.nextExpoData.map((nextExpositions: any) => ({ 
          ...nextExpositions,
          image: 'http://localhost:5000/' + nextExpositions.image.replace(/\\/g, '/')
        }));
        this.allSameYear = this.nextExpositions.every((expo, i, arr) => 
        i === 0 || expo.titleDate === arr[i - 1].titleDate
      );
      } 
    });
  }

}
