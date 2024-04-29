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
  previousYear: number;
  allArchives: Archive[] = [];
  archives: Archive[] = [];
  yearFilter: string = '';
  keywordFilter: string = '';
  isKeywordFilterApplied: boolean = false;
  pages: { [year: number]: number } = {};
  page: number = 1;

  constructor(
    private archivesService: ArchivesService,
    private router: Router,
    private idService: IdService,
    private onClickService: OnClickService,
  ) {
    this.previousYear = 0;
  }
  ngOnInit(): void {
    this.getArchives();
    this.previousYear = 0;
  }

  getArchives(): void {
    this.archivesService.getArchives().subscribe(
        (response: ArchiveResponse) => {
            this.allArchives = response.ArchivesData.slice();
            this.applyFilters();
            if (this.allArchives) {
                const uniqueYears = Array.from(new Set(this.allArchives.map(archive => archive.date)));
                this.pages = {};
                uniqueYears.forEach(year => {
                  this.applyFilters();
                    this.pages[year] = 1;
                });
            }
        },
        (error) => {
            console.error('Erreur lors de la récupération des archives :', error);
        }
    );
}

showYearHeader(currentYear: number): boolean {
  if (this.yearFilter !== '') {
    return true;
  }
  const showHeader = currentYear !== this.previousYear && this.archives.some(archive => archive.date === currentYear);
  this.previousYear = currentYear;
  return showHeader;
}

  applyFilters(): void {
    this.isKeywordFilterApplied = !!this.keywordFilter;
    this.archives = this.allArchives
        .filter(archive => {
            if (this.yearFilter === '') {
                return true;
            } else {
                return archive.date && archive.date.toString().includes(this.yearFilter);
            }
        })
        .filter(archive => {
          return archive.artist.toLowerCase().includes(this.keywordFilter.toLowerCase());
        });
        this.archives.sort((a, b) => b.date - a.date);

}

  applyYearFilter(filterValue: string): void {
    this.yearFilter = filterValue;
    this.applyFilters();
  }

  applyKeywordFilter(filterValue: string): void {
    this.keywordFilter = filterValue;
    this.applyFilters();
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.previousYear = 0;
    this.applyFilters();
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
}

