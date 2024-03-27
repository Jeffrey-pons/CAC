import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionPermanenteService {

  private baseUrl = 'http://localhost:5000/work-expo-permanent';

  constructor(private http: HttpClient) { }

  getArtWork(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }


}
