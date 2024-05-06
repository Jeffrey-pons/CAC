import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextexpositionComponent } from './nextexposition/nextexposition.component';
import { NextexpositionDetailsComponent } from './nextexposition-details/nextexposition-details.component';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';




@NgModule({
  declarations: [NextexpositionComponent, NextexpositionDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FullCalendarModule,
  ]
})
export class NextExpositionModule { }
