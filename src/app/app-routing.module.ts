import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { NextexpositionComponent } from './components/nextexposition/nextexposition.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { LegalnoticeComponent } from './components/legalnotice/legalnotice.component';
import { ActualiteComponent } from './components/actualite/actualite.component';
import { CollectionpermanenteComponent } from './components/collectionpermanente/collectionpermanente.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'a-propos', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'prochaine-exposition', component: NextexpositionComponent },
  { path: 'archives', component: ArchivesComponent },
  { path: 'mentions-legales', component: LegalnoticeComponent },
  { path: 'actualite', component: ActualiteComponent },
  { path: 'collection-permanente', component: CollectionpermanenteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
