import { Component, OnInit } from '@angular/core';
import { ArchivesService } from '../../services/archiveservice/archives.service';
import { Archive, ArchiveResponse } from '../../interfaces/archives.interface';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchiveComponent implements OnInit {
  archives: { year: number; archives: Archive[] }[] = [];

  constructor(private archivesService: ArchivesService) {}

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
    });
  }
}
