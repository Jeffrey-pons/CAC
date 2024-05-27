import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtWorkResponse } from '../../interfaces/collectionP.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionPermanenteService {
  private baseUrlCollection = 'http://localhost:5000/work-expo-permanent';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createArtWork(newArtWorkData: any): Observable<any> {
    const formData = new FormData();
    for (const key in newArtWorkData) {
      if (Object.prototype.hasOwnProperty.call(newArtWorkData, key)) {
        formData.append(key, newArtWorkData[key]);
      }
    }
    return this.http.post<any>(`${this.baseUrlCollection}`, formData, { headers: this.headers });
  }

  getArtWork(): Observable<ArtWorkResponse> {
    return this.http.get<ArtWorkResponse>(`${this.baseUrlCollection}`);
  }

  getArtWorkById(id: string): Observable<ArtWorkResponse> {
    return this.http.get<ArtWorkResponse>(`${this.baseUrlCollection}/${id}`);
  }

  updateArtWork(id: string, updatedData: any): Observable<ArtWorkResponse> {
    return this.http.patch<ArtWorkResponse>(`${this.baseUrlCollection}/${id}`, updatedData, { headers: this.headers });
  }

  deleteArtWork(id: string): Observable<ArtWorkResponse> {
    return this.http.delete<ArtWorkResponse>(`${this.baseUrlCollection}/${id}`, { headers: this.headers });
  }
}
