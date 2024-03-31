import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediationComponent } from './mediation/mediation.component';
import { MediationDetailsComponent } from './mediation-details/mediation-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MediationComponent, MediationDetailsComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MediationModule { }
