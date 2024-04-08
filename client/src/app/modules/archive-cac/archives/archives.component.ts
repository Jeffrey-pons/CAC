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
  yearFilter: string = '';
  keywordFilter: string = '';
  isKeywordFilterApplied: boolean = false;
  page: number = 1;

  constructor(
    private archivesService: ArchivesService,
    private router: Router,
    private idService: IdService,
    private onClickService: OnClickService
  ) {}

  ngOnInit(): void {
    this.fetchArchives();
  }

  fetchArchives(): void {
    this.archivesService.getArchives().subscribe(
      (response: ArchiveResponse) => {
        this.allArchives = response.archivesData;
        this.applyFilters();
      },
      (error) => {
        console.error('Erreur lors de la récupération des archives :', error);
      }
    );
  }

  applyFilters(): void {
    this.isKeywordFilterApplied = !!this.keywordFilter;
    this.archives = this.allArchives
    .filter(archive => archive.date && archive.date.toString().includes(this.yearFilter))
    .filter(archive => archive.artist && archive.artist.includes(this.keywordFilter));
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