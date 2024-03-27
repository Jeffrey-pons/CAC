import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtWorkResponse } from '../../interfaces/collectionP.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionPermanenteService {
  private baseUrl = 'http://localhost:5000/work-expo-permanent';
  constructor(private http: HttpClient) { }

  getArtWork(): Observable<ArtWorkResponse> {
    return this.http.get<ArtWorkResponse>(`${this.baseUrl}`);
  }

}
