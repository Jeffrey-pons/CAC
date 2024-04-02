import { CollectionPermanenteService } from './../../../services/CollectionPService/collection-permanente.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdService } from '../../../services/idService/Id.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-collectionpermanente-details',
  templateUrl: './collectionpermanente-details.component.html',
  styleUrl: './collectionpermanente-details.component.scss'
})
export class CollectionpermanenteDetailsComponent {
  artwork: any = null;

  constructor(
    private route: ActivatedRoute,
    private collectionPermanenteService: CollectionPermanenteService,
    private idService: IdService,
    private location : Location,
  ) {}


  ngOnInit(): void {
    const id = this.idService.getId();
    if (id) {
      this.collectionPermanenteService.getArtWorkById(id).subscribe((data: any) => {
        this.artwork = {
          ...data.artWork,
          image: 'http://localhost:5000/' + data.artWork.image.replace(/\\/g, '/')
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
  splitDescription(description: string, linesPerBreak: number): string[] {
    const lines = description.split('\n').filter(line => line.trim() !== '');
    const result: string[] = [];
    let temp = '';

    for (let i = 0; i < lines.length; i++) {
      temp += lines[i] + '\n';

      if ((i + 1) % linesPerBreak === 0 || i === lines.length - 1) {
        result.push(temp);
        temp = '';
      }
    }

    return result;
  }

}
