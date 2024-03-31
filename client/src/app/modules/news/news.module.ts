import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualiteComponent } from './actualite/actualite.component';
import { ActualiteDetailsComponent } from './actualite-details/actualite-details.component';
import {  RouterModule } from '@angular/router';



@NgModule({
  declarations: [ActualiteComponent, ActualiteDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ActualiteComponent]
})
export class NewsModule { }
