import { CollectionPermanente, ArtWorkResponse } from './../../interfaces/collectionP.interface';
import { Component, OnInit } from '@angular/core';
import { CollectionPermanenteService } from './../../services/CollectionPService/collection-permanente.service';


@Component({
  selector: 'app-collectionpermanente',
  templateUrl: './collectionpermanente.component.html',
  styleUrl: './collectionpermanente.component.scss'
})
export class CollectionpermanenteComponent implements OnInit{
  artworks: CollectionPermanente[] = [];
  page: number = 1;

  constructor(private collectionPermanenteService: CollectionPermanenteService) {}

  ngOnInit(): void {
    this.collectionPermanenteService.getArtWork().subscribe((data: ArtWorkResponse) => {
      if (data && Array.isArray(data.artWorkData)) {
        this.artworks = data.artWorkData.map((artwork: CollectionPermanente) => ({
          ...artwork,
          image: artwork.image.replace(/\\/g, '/')
        }));
        this.artworks.reverse();
      }
    });
  }

  changePage(newPage: number) {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
