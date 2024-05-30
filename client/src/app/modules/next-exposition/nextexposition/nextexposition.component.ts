import { IdService } from '../../../services/idService/Id.service';
import { Component, ElementRef } from '@angular/core';
import { NextExpoServiceService } from '../../../services/nextExpoService/next-expo-service.service';
import { OnInit } from '@angular/core';
import { NextExpo, NextExpoResponse } from '../../../interfaces/nextExpo.interface';
import { Router } from '@angular/router';
import { CalendarOptions, Calendar } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { OnClickService } from '../../../utils/onClick.utils';

@Component({
  selector: 'app-nextexposition',
  templateUrl: './nextexposition.component.html',
  styleUrls: ['./nextexposition.component.scss'],
})
export class NextexpositionComponent implements OnInit {
  nextExpositions: NextExpo[] = [];
  allSameYear: boolean = false;
  currentMonth: number = 0;
  currentYear: number = 2024;
  highlightedDate: string | null = null;
  calendarApi: any;

  calendarOptions: CalendarOptions = {
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
    datesSet: this.handleDatesSet.bind(this),
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

  handleDatesSet(calendar: any) {
    this.calendarApi = calendar.view.calendar;
  }

  navigateToDetail(nextExpoId: string, name: string) {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.idService.setId(nextExpoId);
    this.router.navigate(['/next-exposition', name]);
  }

  updateCalendar() {
    const events = this.nextExpositions.map(expo => ({
      title: expo.name,
      start: expo.dateOfExpo,
      classNames: 'highlighted-date',
    }));

    const backgroundEvents = this.nextExpositions.map(expo => ({
      start: expo.dateOfExpo,
      end: expo.dateOfExpo,
      display: 'background',
      classNames: 'fc-daygrid-day-number'
    }));

    if (this.calendarApi) {
      this.calendarApi.removeAllEvents();
      this.calendarApi.addEventSource([...events, ...backgroundEvents]);
    }
    if (this.highlightedDate && this.calendarApi) {
      this.calendarApi.gotoDate(this.highlightedDate);
    }
  }

  highlightExpoDate(dateOfExpo: string) {
    const individualDates: NextExpo[] = [];

    if (dateOfExpo.includes('Du')) {
      const dateRange = dateOfExpo.split(' au ');
      if (dateRange.length === 2) {
        const startDate = this.convertToISODate(dateRange[0].replace('Du ', '').trim());
        const endDate = this.convertToISODate(dateRange[1].trim());

        if (startDate && endDate) {
          const currentDate = new Date(startDate);
          const end = new Date(endDate);

          while (currentDate <= end) {
            individualDates.push({
              _id: 'dummy',
              titleDate: 'dummy',
              image: 'dummy',
              name: 'dummy',
              dateOfExpo: currentDate.toISOString().split('T')[0],
              description: 'dummy',
              type: 'dummy'
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }
    } else {
      const date = this.convertToISODate(dateOfExpo.trim());
      if (date) {
        individualDates.push({
          _id: 'dummy',
          titleDate: 'dummy',
          image: 'dummy',
          name: 'dummy',
          dateOfExpo: date,
          description: 'dummy',
          type: 'dummy'
        });
      }
    }

    const newHighlightedDate = individualDates.length > 0 ? individualDates[0].dateOfExpo : null;
    if (newHighlightedDate !== this.highlightedDate) {
      this.highlightedDate = newHighlightedDate;
      this.updateCalendar();
    }
  }

  removeHighlightExpoDate() {
    this.highlightedDate = null;
    this.updateCalendar();
  }

  generateIndividualDates(expoData: NextExpo[]): NextExpo[] {
    const individualDates: NextExpo[] = [];
    expoData.forEach(expo => {
      if (expo.dateOfExpo.includes('Du')) {
        const dateRange = expo.dateOfExpo.split(' au ');
        if (dateRange.length === 2) {
          const startDate = this.convertToISODate(dateRange[0].replace('Du ', '').trim());
          const endDate = this.convertToISODate(dateRange[1].trim());

          if (startDate && endDate) {
            const currentDate = new Date(startDate);
            const end = new Date(endDate);

            while (currentDate <= end) {
              individualDates.push({
                ...expo,
                dateOfExpo: currentDate.toISOString().split('T')[0],
              });
              currentDate.setDate(currentDate.getDate() + 1);
            }
          } else {
            console.error('Invalid date range:', expo.dateOfExpo);
          }
        }
      } else {
        const date = this.convertToISODate(expo.dateOfExpo.trim());
        if (date) {
          individualDates.push({
            ...expo,
            dateOfExpo: date,
          });
        } else {
          console.error('Invalid date:', expo.dateOfExpo);
        }
      }
    });
    return individualDates;
  }

  convertToISODate(dateString: string): string | null {
    const months: { [key: string]: string } = {
      "janvier": "01",
      "février": "02",
      "mars": "03",
      "avril": "04",
      "mai": "05",
      "juin": "06",
      "juillet": "07",
      "août": "08",
      "septembre": "09",
      "octobre": "10",
      "novembre": "11",
      "décembre": "12"
    };

    const dateRegex = /(\d+)\s+([a-zéû]+)(?:\s+(\d+))?/i;
    const match = dateString.match(dateRegex);

    if (!match) {
      console.error(`Invalid date format: ${dateString}`);
      return null;
    }

    const day = match[1].padStart(2, '0');
    const monthName = match[2].toLowerCase();
    const year = match[3] || this.currentYear.toString();

    const month = months[monthName];
    if (!month) {
      console.error(`Invalid month: ${monthName}`);
      return null;
    }

    const isoDate = `${year}-${month}-${day}`;
    return isoDate;
  }
}
