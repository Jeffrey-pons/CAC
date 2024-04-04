import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchivesService } from '../../../services/archiveservice/archives.service';
import { IdService } from '../../../services/idService/Id.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-archives-details',
  templateUrl: './archives-details.component.html',
  styleUrl: './archives-details.component.scss'
})
export class ArchivesDetailsComponent implements OnInit, OnDestroy{
archive: any = null;
constructor(private archivesService: ArchivesService, private route: ActivatedRoute, private idService: IdService, private location: Location) { }

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
goBack(): void {
  this.location.back();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

splitDescription(description: string, linesPerBreak: number): { content: string, isImage: boolean }[] {
  const lines = description.split('\n');
  const result: { content: string, isImage: boolean }[] = [];
  let temp = '';

  for (let i = 0; i < lines.length; i++) {
    temp += lines[i] + '\n';

    if ((i + 1) % linesPerBreak === 0 || i === lines.length - 1) {
      // Ajouter le contenu du paragraphe au résultat
      result.push({ content: temp, isImage: false });
      temp = '';

      // Si c'est le deuxième paragraphe, ajouter une image
      if ((i + 1) % (linesPerBreak * 2) === 0 || i === lines.length - 1) {
        result.push({ content: '', isImage: true });
      }
    }
  }

  return result;
}
}
