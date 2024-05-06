import { IdService } from '../../../services/idService/Id.service';
import { Component, ElementRef } from '@angular/core';
import { NextExpoServiceService } from '../../../services/nextExpoService/next-expo-service.service';
import { OnInit } from '@angular/core';
import { NextExpo, NextExpoResponse } from '../../../interfaces/nextExpo.interface';
import { Router } from '@angular/router';
// import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, Calendar } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

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
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    firstDay: 1,
    locale: 'fr',
    showNonCurrentDates: false,
  };


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
      this.updateCalendar();
    });
  }

  navigateToDetail(nextExpoId: string, name: string) {
    this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.idService.setId(nextExpoId);
    this.router.navigate(['/next-exposition', name]);
  }

  updateCalendar() {
  }


}
