import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { NextexpositionComponent } from './components/nextexposition/nextexposition.component';
import { ArchiveComponent } from './components/archives/archives.component';
import { LegalnoticeComponent } from './components/legalnotice/legalnotice.component';
import { ActualiteComponent } from './components/actualite/actualite.component';
import { CollectionpermanenteComponent } from './components/collectionpermanente/collectionpermanente.component';
import { OeuvresCollectionPermamComponent } from './components/oeuvres-collection-permam/oeuvres-collection-permam.component';
import { AuthAdminComponent } from './modules/back-office/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: ActualiteComponent },
  { path: 'a-propos', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'prochaine-exposition', component: NextexpositionComponent },
  { path: 'archives', component: ArchiveComponent },
  { path: 'mentions-legales', component: LegalnoticeComponent },
  { path: 'collection-permanente', component: CollectionpermanenteComponent },
  { path: 'cac-back-office-connexion', component: AuthAdminComponent },
  { path: 'oeuvre-collection-permanente', component: OeuvresCollectionPermamComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
