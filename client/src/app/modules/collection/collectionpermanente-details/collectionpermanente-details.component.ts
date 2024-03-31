import { CollectionPermanenteService } from './../../../services/CollectionPService/collection-permanente.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdService } from '../../../services/idService/Id.service';


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
}
