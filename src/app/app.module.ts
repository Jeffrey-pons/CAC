// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from "./_shared/components/navbar/navbar.component";
import { FooterComponent } from "./_shared/components/footer/footer.component";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OuvertureFermetureComponent } from './_shared/components/ouverture-fermeture/ouverture-fermeture.component';
import { LoaderComponent } from './_shared/components/loader/loader.component';
import { LoadingInterceptor } from './interceptor/loading';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    OuvertureFermetureComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }



