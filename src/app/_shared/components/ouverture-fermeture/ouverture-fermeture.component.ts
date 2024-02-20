import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ouverture-fermeture',
  templateUrl: './ouverture-fermeture.component.html',
  styleUrls: ['./ouverture-fermeture.component.scss']
})
export class OuvertureFermetureComponent implements OnInit {
  estOuvert: boolean = false;
  heureFermeture: string = '';

  constructor() { }

  ngOnInit(): void {
    this.estOuvert = this.verifierOuverture();
  }

  verifierOuverture(): boolean {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();

    // Vérifier si c'est un jour férié
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return false;
    }

    // Vérifier si c'est un jour de fermeture exceptionnelle
    const dateCourante = now.getDate();
    const moisCourant = now.getMonth() + 1;
    const anneeCourante = now.getFullYear();

    // Fermetures exceptionnelles
    const fermeturesExceptionnelles = [
      { jour: 29, mois: 3, annee: 2024 },
      { jour: 1, mois: 8, annee: 2024 }
    ];

    for (const fermeture of fermeturesExceptionnelles) {
      if (dateCourante === fermeture.jour && moisCourant === fermeture.mois && anneeCourante === fermeture.annee) {
        return false;
      }
    }

    switch (dayOfWeek) {
      case 3: // Mercredi
      case 4: // Jeudi
        if (hour >= 14 && hour < 19) {
          this.heureFermeture = '19:00';
          return true;
        }
        break;
      case 6: // Samedi
        if ((hour >= 10 && hour < 13) || (hour >= 14 && hour < 18)) {
          this.heureFermeture = '18:00';
          return true;
        }
        break;
    }

    return false;
  }
}
