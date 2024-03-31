import { ArchiveComponent } from '../archive-cac/archives/archives.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivesDetailsComponent } from './archives-details/archives-details.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ArchiveComponent, ArchivesDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
  ]
})
export class ArchiveCacModule { }
