import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAdminComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {  RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { AdherentsComponent } from './adherents/adherents.component';
import { BackofficeComponent } from './backoffice/backoffice.component';

@NgModule({
  declarations: [AuthAdminComponent, AdminComponent, AdherentsComponent, BackofficeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
  ]
})
export class BackOfficeModule { }
