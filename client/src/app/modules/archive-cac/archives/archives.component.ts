import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArchivesService } from '../../../services/archiveservice/archives.service';
import { Archive, ArchiveResponse } from '../../../interfaces/archives.interface';
import { Router } from '@angular/router';
import { IdService } from '../../../services/idService/Id.service';
import { OnClickService } from '../../../utils/onClick.utils';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArchiveComponent implements OnInit {
  allArchives: Archive[] = [];
  archives: Archive[] = [];
  page: number = 1;

  constructor(
    private archivesService: ArchivesService,
    private router: Router,
    private idService: IdService,
    private onClickService: OnClickService
  ) {}

  ngOnInit(): void {
    this.getArchives();
  }

  getArchives(): void {
    this.archivesService.getArchives().subscribe(
      (response: ArchiveResponse) => {
        this.allArchives = response.ArchivesData;
        if (this.allArchives) {
          this.allArchives.sort((a, b) => {
            if (!a.date || !b.date) {
              return 0;
            }
            return b.date - a.date;
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des archives :', error);
      }
    );
  }

  changePage(newPage: number): void {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToDetail(archiveId: string, artist: string): void {
    this.idService.setId(archiveId);
    this.router.navigate(['/archive', artist]);
  }

  handleFocus(): void {
    this.onClickService.handleFocus();
  }

  handleBlur(): void {
    this.onClickService.handleBlur();
  }

  handleClick(): void {
    this.onClickService.handleClick();
  }

  handleKeyUp(event: KeyboardEvent): void {
    this.onClickService.handleKeyUp(event);
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.onClickService.handleKeyDown(event);
  }
  getYearsBefore2019(): number[] {
    const years: number[] = [];
    this.allArchives.forEach((archive) => {
      if (archive.date < 2019 && !years.includes(archive.date)) {
        years.push(archive.date);
      }
    });
    return years.sort((a, b) => b - a);
  }
  getYearsAfter2019(): { year: number, archives: Archive[] }[] {
    const yearsWithArchives: { year: number, archives: Archive[] }[] = [];
    const years: number[] = [];

    for (let year = 2023; year >= 2019; year--) {
      const yearArchives = this.allArchives.filter(a => a.date === year);
      if (yearArchives.length > 0) {
        yearsWithArchives.push({ year, archives: yearArchives });
        years.push(year);
      }
    }
    const filteredYearsWithArchives = years.map(year => yearsWithArchives.find(y => y.year === year)).filter(y => y !== undefined) as { year: number, archives: Archive[] }[];
    return filteredYearsWithArchives;
  }


}

