import { Component, OnInit } from '@angular/core';
import { CollectionPermanenteService } from './../../services/CollectionPService/collection-permanente.service';

@Component({
  selector: 'app-collectionpermanente',
  templateUrl: './collectionpermanente.component.html',
  styleUrl: './collectionpermanente.component.scss'
})
export class CollectionpermanenteComponent implements OnInit{
  artworks: any[] = [];

  constructor(private collectionPermanenteService: CollectionPermanenteService) {}

  ngOnInit(): void {
    this.collectionPermanenteService.getArtWork().subscribe(data => {
      console.log('Data from service:', data);
      if (data && Array.isArray(data.artWorkData)) {
        this.artworks = data.artWorkData.map((artwork: any) => ({ 
          ...artwork,
          image: artwork.image.replace(/\\/g, '/')
        }));
      } else {
        console.error('Invalid data format:', data);
      }
    });
  }
}