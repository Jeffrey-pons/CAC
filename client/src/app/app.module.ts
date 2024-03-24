// app.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from "./_shared/components/navbar/navbar.component";
import { FooterComponent } from "./_shared/components/footer/footer.component";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OuvertureFermetureComponent } from './_shared/components/ouverture-fermeture/ouverture-fermeture.component';
import { LoaderComponent } from './_shared/components/loader/loader.component';
import { LoadingInterceptor } from './interceptor/loading';
import { AdhesionComponent } from './_shared/components/adhesion/adhesion.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FormsModule } from '@angular/forms';
import { AuthAdminComponent } from './modules/back-office/login/login.component';
import { ArchiveComponent } from './components/archives/archives.component';
import { CollectionpermanenteComponent } from './components/collectionpermanente/collectionpermanente.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NextexpositionComponent } from './components/nextexposition/nextexposition.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    OuvertureFermetureComponent,
    LoaderComponent,
    AdhesionComponent,
    AboutusComponent,
    AuthAdminComponent,
    ArchiveComponent,
    CollectionpermanenteComponent,
    NotFoundComponent,
    NextexpositionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    BrowserModule],
  bootstrap: [AppComponent]
})

export class AppModule { }



