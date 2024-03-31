import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchivesService } from '../../../services/archiveservice/archives.service';
import { IdService } from '../../../services/idService/Id.service';

@Component({
  selector: 'app-archives-details',
  templateUrl: './archives-details.component.html',
  styleUrl: './archives-details.component.scss'
})
export class ArchivesDetailsComponent {
archive: any = null;
constructor(private archivesService: ArchivesService, private route: ActivatedRoute, private idService: IdService) { }

ngOnInit(): void {
  const id = this.idService.getId();
  if (id) {
    this.archivesService.getArchivesById(id).subscribe((data: any) => {
      this.archive = {
        ...data.archive,
        image: data.archive.image.map((img: string) => 'http://localhost:5000/' + img.replace(/\\/g, '/'))
      }
    }, (error) => {
      console.error('Error:', error);
    });
  }
}
ngOnDestroy(): void {
  this.idService.setId('');
}
}
