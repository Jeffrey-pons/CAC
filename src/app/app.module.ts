// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "./_shared/components/navbar/navbar.component";
import { FooterComponent } from "./_shared/components/footer/footer.component";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OuvertureFermetureComponent } from './_shared/components/ouverture-fermeture/ouverture-fermeture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    OuvertureFermetureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }



