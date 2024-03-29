import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://localhost:5000/news';

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getNewsById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      tap(data => {
        console.log('News data:', data); // Ajoutez cette ligne
      })
    );
  }
}
