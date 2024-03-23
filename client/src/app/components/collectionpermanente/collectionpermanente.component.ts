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
      if (data && Array.isArray(data.artWorkData)) {
        this.artworks = data.artWorkData;
      } else {
        console.error('Invalid data format:', data);
      }
    });
  }
}
