import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { NextexpositionComponent } from './modules/next-exposition/nextexposition/nextexposition.component';
import { ArchiveComponent } from './modules/archive-cac/archives/archives.component';
import { LegalnoticeComponent } from './components/legalnotice/legalnotice.component';
import { CollectionpermanenteComponent } from './modules/collection/collectionpermanente/collectionpermanente.component';
import { AuthAdminComponent } from './modules/back-office/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MediationComponent } from './modules/mediation-cac/mediation/mediation.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ActualiteComponent } from '../app/modules/news/actualite/actualite.component';
import { ActualiteDetailsComponent } from './modules/news/actualite-details/actualite-details.component';
import { NextexpositionDetailsComponent } from './modules/next-exposition/nextexposition-details/nextexposition-details.component';
import { MediationDetailsComponent } from './modules/mediation-cac/mediation-details/mediation-details.component';
import { CollectionpermanenteDetailsComponent } from './modules/collection/collectionpermanente-details/collectionpermanente-details.component';
import { ArchivesDetailsComponent } from './modules/archive-cac/archives-details/archives-details.component';

const routes: Routes = [
  { path: '', component: ActualiteComponent }, 
  { path: 'news/:title', component: ActualiteDetailsComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'next-exposition', component: NextexpositionComponent },
  { path: 'next-exposition/:name', component: NextexpositionDetailsComponent},
  { path: 'archive', component: ArchiveComponent },
  { path: 'archive/:artist', component: ArchivesDetailsComponent },
  { path: 'mentions-legales', component: LegalnoticeComponent },
  { path: 'collection', component: CollectionpermanenteComponent },
  { path: 'collection/:artist', component: CollectionpermanenteDetailsComponent },
  { path: 'back-office', component: AuthAdminComponent },
  { path: 'mediation', component: MediationComponent },
  { path: 'mediation/:title', component: MediationDetailsComponent},
  { path: 'friends', component: FriendsComponent },


    { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
