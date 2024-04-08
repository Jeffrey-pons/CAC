import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, NewsResponse } from '../../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrlNews = 'http://localhost:5000/news';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createNews(newNewsData: any): Observable<any> {
    const formData = new FormData();
    for (const key in newNewsData) {
      if (newNewsData.hasOwnProperty(key)) {
        formData.append(key, newNewsData[key]);
      }
    }
    return this.http.post<any>(`${this.baseUrlNews}`, formData, { headers: this.headers });
  }

  getNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrlNews}`);
  }

  getNewsById(id: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrlNews}/${id}`);
  }

  updateNews(id: string, updatedData: any): Observable<NewsResponse> {
    return this.http.patch<NewsResponse>(`${this.baseUrlNews}/${id}`, updatedData, { headers: this.headers });
  }

  deleteNewsbyId(id: string): Observable<NewsResponse> {
    return this.http.delete<NewsResponse>(`${this.baseUrlNews}/${id}`, { headers: this.headers });
  }
}
