import { Component, ElementRef } from '@angular/core';
import { NextExpoServiceService } from '../../services/nextExpoService/next-expo-service.service';
import { OnInit } from '@angular/core';
import { NextExpo, NextExpoResponse } from '../../interfaces/nextExpo.interface';

@Component({
  selector: 'app-nextexposition',
  templateUrl: './nextexposition.component.html',
  styleUrl: './nextexposition.component.scss'
})
export class NextexpositionComponent implements OnInit {
  nextExpositions: NextExpo[] = [];
  allSameYear: boolean = false;


  constructor(private nextExpoService: NextExpoServiceService, private el: ElementRef) { }

  ngOnInit(): void {
    this.nextExpoService.getNextExpo().subscribe((data: NextExpoResponse) => {
      if (data && Array.isArray(data.nextExpoData)) {
        this.nextExpositions = data.nextExpoData.map((nextExpositions: NextExpo) => ({
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
