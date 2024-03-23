import { Component, OnInit } from '@angular/core';
import { ArchivesService } from '../../services/archiveservice/archives.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrl: './archives.component.scss'
})
export class ArchiveComponent implements OnInit {
  archives: any[] = [];

  constructor(private archivesService: ArchivesService) {}

  ngOnInit(): void {
    this.archivesService.getArchives().subscribe(data => {
      this.archives = data.ArchivesData;
    });
  }
}