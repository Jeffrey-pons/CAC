import { IdService } from '../../../services/idService/Id.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NextExpoServiceService } from '../../../services/nextExpoService/next-expo-service.service';
import { NextExpo, NextExpoResponse } from '../../../interfaces/nextExpo.interface';

@Component({
  selector: 'app-nextexposition-details',
  templateUrl: './nextexposition-details.component.html',
  styleUrls: ['./nextexposition-details.component.scss']
})
export class NextexpositionDetailsComponent implements OnInit, OnDestroy {
  expo: any = null;

  constructor(
    private route: ActivatedRoute,
    private nextExpoService: NextExpoServiceService,
    private idService: IdService,
  ) {}

  ngOnInit(): void {
    const id = this.idService.getId();
    if (id) {
      this.nextExpoService.getNextExpoById(id).subscribe((data: any) => {
        this.expo = {
          ...data.nextExpo,
          image: 'http://localhost:5000/' + data.nextExpo.image.replace(/\\/g, '/')
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