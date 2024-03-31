import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArchivesService } from '../../../services/archiveservice/archives.service';
import { Archive } from '../../../interfaces/archives.interface';
import { Router } from '@angular/router';
import { IdService } from '../../../services/idService/Id.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss'],
  //style pour ngx pagination
  encapsulation: ViewEncapsulation.None
})
export class ArchiveComponent implements OnInit {
  allArchives: { year: number; archives: Archive[] }[] = [];
  archives: { year: number; archives: Archive[] }[] = [];
  yearFilter: string = '';
  keywordFilter: string = '';
  isKeywordFilterApplied: boolean = false;
  page: number = 1;

  constructor(private archivesService: ArchivesService, private router: Router, private idService: IdService) {}


  ngOnInit(): void {
    this.archivesService.getArchives().subscribe(data => {
      const groupedArchives = data.ArchivesData.reduce((acc: any, archive: any) => {
        const year = archive.date; // Récupérer l'année de l'archive
        if (!acc[year]) {
          acc[year] = []; // Créer un tableau vide s'il n'existe pas encore pour cette année
        }
        acc[year].push(archive);
        return acc;
      }, {});

      this.archives = Object.keys(groupedArchives).map(year => ({
        year: parseInt(year, 10),
        archives: groupedArchives[year]
      })).reverse();
      this.archives.forEach(group => {
        if (group.year < 2019) {
          group.archives[0].artist = group.archives.map((archive, index, array) => {
            return archive.artist + (index < array.length - 1 ? '  |  ' : ' ');
          }).join('');
        }
      });
      this.allArchives = this.archives;
      this.applyFilters();
    });
  }
  applyFilters() {
    this.isKeywordFilterApplied = !!this.keywordFilter;
    this.archives = this.allArchives
      .filter(group => group.year.toString().includes(this.yearFilter))
      .map(group => ({
        year: group.year,
        archives: group.archives.filter(archive => archive.artist.includes(this.keywordFilter))
      }));
  }
  applyYearFilter(filterValue: string) {
    this.yearFilter = filterValue;
    this.applyFilters();
  }

  applyKeywordFilter(filterValue: string) {
    this.keywordFilter = filterValue;
    this.applyFilters();
  }
  changePage(newPage: number) {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  navigateToDetail(archiveId: string, artist: string) {
    this.idService.setId(archiveId);
    this.router.navigate(['/archive', artist]);
  }
}
