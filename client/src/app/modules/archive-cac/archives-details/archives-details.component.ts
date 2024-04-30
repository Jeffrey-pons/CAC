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

constructor(
  private archivesService: ArchivesService,
  private route: ActivatedRoute,
  private idService: IdService,
  private location: Location
) { }

ngOnInit(): void {
  const id = this.idService.getId();
  if (id) {
    this.archivesService.getArchivesById(id).subscribe((data: any) => {
      let images: string[] = [];
      if (data.archive.image && Array.isArray(data.archive.image)) {
        images = data.archive.image.map((img: string) => 'http://localhost:5000/' + img.replace(/\\/g, '/'));
      }
      this.archive = {
        ...data.archive,
        image: images
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

splitDescription(description: string, linesPerBreak: number): { content: string, isImage: boolean, index: number, isLastImage: boolean }[] {
  const lines = description.split('\n');
  const result: { content: string, isImage: boolean, index: number, isLastImage: boolean }[] = [];
  let imageIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    if (i % linesPerBreak === 0) {
      result.push({ content: lines[i], isImage: false, index: -1, isLastImage: false });
    } else {
      if (i % linesPerBreak === 1) {
        const isLastImage = this.isLastImage(i, linesPerBreak, lines.length);
        result.push({ content: lines[i], isImage: true, index: imageIndex, isLastImage: isLastImage });
        imageIndex++;
      } else {
        result.push({ content: lines[i], isImage: false, index: -1, isLastImage: false });
      }
    }
  }

  return result;
}

isLastImage(currentIndex: number, linesPerBreak: number, totalLines: number): boolean {
  const remainingLines = totalLines - currentIndex;
  return remainingLines <= linesPerBreak;
}

}
