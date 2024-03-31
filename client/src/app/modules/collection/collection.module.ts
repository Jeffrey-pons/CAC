import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CollectionpermanenteComponent} from './collectionpermanente/collectionpermanente.component';
import { CollectionpermanenteDetailsComponent } from './collectionpermanente-details/collectionpermanente-details.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CollectionpermanenteComponent, CollectionpermanenteDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
  ]
})
export class CollectionModule { }
