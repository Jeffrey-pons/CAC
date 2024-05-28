import { IdService } from '../../../services/idService/Id.service';
import { Component, ElementRef } from '@angular/core';
import { NextExpoServiceService } from '../../../services/nextExpoService/next-expo-service.service';
import { OnInit } from '@angular/core';
import { NextExpo, NextExpoResponse } from '../../../interfaces/nextExpo.interface';
import { Router } from '@angular/router';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { OnClickService } from '../../../utils/onClick.utils';

@Component({
  selector: 'app-nextexposition',
  templateUrl: './nextexposition.component.html',
  styleUrl: './nextexposition.component.scss',
})
export class NextexpositionComponent implements OnInit {
  nextExpositions: NextExpo[] = [];
  allSameYear: boolean = false;
  currentMonth: number = 0;
  currentYear: number = 2024;
  calendarOptions: CalendarOptions= {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [
      { title: 'event 1', date: '2024-01-01' },
      { title: 'event 2', date: '2024-01-02' }
    ],
    eventColor: '#378006',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    firstDay: 1,
    locale: 'fr',
    showNonCurrentDates: false,
    eventDidMount: this.handleEventMount.bind(this),
  };
  constructor(
    private nextExpoService: NextExpoServiceService,
    private el: ElementRef,
    private router: Router,
    private idService: IdService,
    private onClickService: OnClickService,
  ) { }

  ngOnInit(): void {
    this.nextExpoService.getNextExpo().subscribe((data: NextExpoResponse) => {
      if (data && Array.isArray(data.nextExpoData)) {
        this.nextExpositions = this.generateIndividualDates(data.nextExpoData)
        this.nextExpositions = data.nextExpoData.map((nextExpositions: NextExpo) => ({
          ...nextExpositions,
          image: 'http://localhost:5000/' + nextExpositions.image.replace(/\\/g, '/')
        }));

        this.allSameYear = this.nextExpositions.every((expo, i, arr) =>
        i === 0 || expo.titleDate === arr[i - 1].titleDate
      );
      this.updateCalendar();
      }
    });
  }

  navigateToDetail(nextExpoId: string, name: string) {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.idService.setId(nextExpoId);
    this.router.navigate(['/next-exposition', name]);
  }

  updateCalendar() {
    this.calendarOptions.events = this.nextExpositions.map(expo => ({
      title: expo.name,
      start: expo.dateOfExpo,
    }));
  }

  handleEventMount(arg: any) {
    const event = arg.event;
    const eventDate = new Date(event.start);
    const highlightedDates = [
        '2024-01-13', '2024-04-24', '2024-04-27', '2024-07-20',
        '2024-06-15', '2024-09-20', '2024-11-09', '2024-12-15',
        '2023-08-04', '2024-04-05', '2024-07-22', '2024-09-30'
    ];

    if (highlightedDates.some(date => date === eventDate.toISOString().slice(0, 10))) {
        event.backgroundColor = 'red'; // Choisissez la couleur souhaitée
    }
}

  isExpoEvent(event: any): boolean {
    const eventDate = new Date(event.start);
    return this.nextExpositions.some(expo => {
      const expoStartDate = new Date(expo.dateOfExpo);
      const expoEndDate = new Date(expo.dateOfExpo);
      return eventDate >= expoStartDate && eventDate <= expoEndDate;
    });
  }
  generateIndividualDates(expoData: NextExpo[]): NextExpo[] {
    const individualDates: NextExpo[] = [];
    expoData.forEach(expo => {
      if (expo.dateOfExpo.includes('Du')) {
        const dates = expo.dateOfExpo.match(/\d+\s\w+/g);
        if (dates) {
          dates.forEach(date => {
            individualDates.push({
              ...expo,
              dateOfExpo: date.trim(),
            });
          });
        }
      } else {
        individualDates.push(expo);
      }
    });
    return individualDates;
  }
}
