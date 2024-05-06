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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FriendsComponent } from './components/friends/friends.component';
import { NewsModule } from './modules/news/news.module';
import { NextExpositionModule } from './modules/next-exposition/next-exposition.module';
import { MediationModule } from './modules/mediation-cac/mediation.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ArchiveCacModule } from './modules/archive-cac/archive-cac.module';
import { BackOfficeModule } from './modules/back-office/back-office.module';
import { NotificationBannerComponent } from './modules/back-office/notification-banner/notification-banner.component';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    OuvertureFermetureComponent,
    LoaderComponent,
    AdhesionComponent,
    AboutusComponent,
    NotFoundComponent,
    FriendsComponent,
    NotificationBannerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NewsModule,
    NextExpositionModule,
    MediationModule,
    CollectionModule,
    ArchiveCacModule,
    BackOfficeModule,
    BrowserAnimationsModule,
    FullCalendarModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    BrowserModule],
  bootstrap: [AppComponent]
})

export class AppModule { }



