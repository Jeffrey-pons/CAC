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
  highlightedDate: string | null = null;

  calendarOptions: CalendarOptions= {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
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
    eventContent: this.highlightEventContent.bind(this)
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
    console.log('Updating calendar events with highlighted date:', this.highlightedDate);
    this.calendarOptions.events = this.nextExpositions.map(expo => ({
      title: expo.name,
      start: expo.dateOfExpo,
      backgroundColor: expo.dateOfExpo === this.highlightedDate ? 'yellow' : '',
    }));
  }

  highlightExpoDate(dateOfExpo: string) {
    console.log('Mouse enter on expo date:', dateOfExpo);
    this.highlightedDate = dateOfExpo;
    this.updateCalendar();
  }

  removeHighlightExpoDate() {
    console.log('Mouse leave from expo date');
    this.highlightedDate = null;
    this.updateCalendar();
  }

  handleEventMount(arg: any) {
    const event = arg.event;
    const eventDate = new Date(event.start).toISOString().slice(0, 10);
    console.log('Event mounted with date:', eventDate, 'highlighted date:', this.highlightedDate);
    if (eventDate === this.highlightedDate) {
      arg.el.style.backgroundColor = 'yellow';
    } else {
      arg.el.style.backgroundColor = '';
    }
  }

  highlightEventContent(arg: any) {
    const eventDate = new Date(arg.event.start).toISOString().slice(0, 10);
    if (eventDate === this.highlightedDate) {
      return { html: `<div style="background-color: yellow">${arg.event.title}</div>` };
    }
    return { html: arg.event.title };
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
