import { IdService } from '../../../services/idService/Id.service';
import { Component, ElementRef } from '@angular/core';
import { NextExpoServiceService } from '../../../services/nextExpoService/next-expo-service.service';
import { OnInit } from '@angular/core';
import { NextExpo, NextExpoResponse } from '../../../interfaces/nextExpo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nextexposition',
  templateUrl: './nextexposition.component.html',
  styleUrl: './nextexposition.component.scss'
})
export class NextexpositionComponent implements OnInit {
  nextExpositions: NextExpo[] = [];
  allSameYear: boolean = false;
  currentMonth: number = 0;
  currentYear: number = 2024;


  constructor(private nextExpoService: NextExpoServiceService, private el: ElementRef, private router: Router, private idService: IdService) { }

  ngOnInit(): void {
    this.nextExpoService.getNextExpo().subscribe((data: NextExpoResponse) => {
      if (data && Array.isArray(data.nextExpoData)) {
        this.nextExpositions = data.nextExpoData.map((nextExpositions: NextExpo) => ({
          ...nextExpositions,
          image: 'http://localhost:5000/' + nextExpositions.image.replace(/\\/g, '/')
        }));
        this.allSameYear = this.nextExpositions.every((expo, i, arr) =>
        i === 0 || expo.titleDate === arr[i - 1].titleDate
      );
      }
    });
    this.updateCalendar();
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    if (prevMonthBtn && nextMonthBtn) {
      prevMonthBtn.addEventListener('click', () => this.prevMonth());
      nextMonthBtn.addEventListener('click', () => this.nextMonth());
    }
  }

  navigateToDetail(nextExpoId: string, name: string) {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.idService.setId(nextExpoId);
    this.router.navigate(['/next-exposition', name]);
  }

  generateCalendarDays(year: number, month: number) {
    const calendarDates = document.getElementById('calendarDates');
    if (calendarDates) {
        calendarDates.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 0).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Ajouter les jours du mois précédent jusqu'au premier jour du mois
        for (let i = firstDayOfMonth; i > 0; i--) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date', 'previous-month');
            dateElement.textContent = '';
            calendarDates.appendChild(dateElement);
        }

        // Ajouter les jours du mois actuel
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date', 'current-month');

            // Vérifier si la date correspond à une exposition
            const expoDate = this.formatDate(year, month, day); // Formatage de la date
            const isExpoDate = this.nextExpositions.some(expo => expo.dateOfExpo.includes(expoDate));

            if (isExpoDate) {
                dateElement.classList.add('expo-date'); // Ajout de la classe pour les dates d'exposition
            }

            dateElement.textContent = day.toString();
            calendarDates.appendChild(dateElement);
        }

        // Ajouter les jours du mois suivant jusqu'à la fin de la semaine
        for (let i = 1; i < 7 - lastDayOfMonth; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date', 'next-month');
            dateElement.textContent = '';
            calendarDates.appendChild(dateElement);
        }
    }
}

formatDate(year: number, month: number, day: number): string {
    return `${day.toString().padStart(2, '0')} ${this.getMonthName(month)} ${year}`;
}




parseExpoDate(dateString: string): Date {
  const dateParts = dateString.trim().split(' ');
  const day = parseInt(dateParts[0]);
  const monthName = dateParts[dateParts.length - 2]; // Obtenir le mois en prenant l'avant-dernière partie de la chaîne
  const monthIndex = this.getMonthIndex(monthName);
  const yearPart = dateParts[dateParts.length - 1]; // Obtenir l'année en prenant la dernière partie de la chaîne
  const year = parseInt(yearPart); // Convertir l'année en nombre
  return new Date(year, monthIndex, day);
}

  getMonthIndex(monthName: string): number {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
  }

  updateCalendar() {
    const currentMonthElement = document.getElementById('currentMonth');
    if (currentMonthElement) {
      currentMonthElement.textContent = this.getMonthName(this.currentMonth) + ' ' + this.currentYear;
      this.generateCalendarDays(this.currentYear, this.currentMonth);
    }
  }

  getMonthName(monthIndex: number) {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthIndex];
  }
  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.updateCalendar();
  }
}
