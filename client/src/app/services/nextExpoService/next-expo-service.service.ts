import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NextExpoResponse } from '../../interfaces/nextExpo.interface';

@Injectable({
  providedIn: 'root'
})
export class NextExpoServiceService {

  private baseUrlNextExpo = 'http://localhost:5000/next-exposition';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createNextExpo(newNextExpoData: any): Observable<any> {
    const formData = new FormData();
    for (const key in newNextExpoData) {
      if (newNextExpoData.hasOwnProperty(key)) {
        formData.append(key, newNextExpoData[key]);
      }
    }
    return this.http.post<any>(`${this.baseUrlNextExpo}`, formData, { headers: this.headers });
  }

  getNextExpo(): Observable<NextExpoResponse> {
    return this.http.get<NextExpoResponse>(`${this.baseUrlNextExpo}`);
  }

  getNextExpoById(id: string): Observable<NextExpoResponse> {
    return this.http.get<NextExpoResponse>(`${this.baseUrlNextExpo}/${id}`);
  }

  updateNextExpo(id: string, updatedData: any): Observable<NextExpoResponse> {
    return this.http.patch<NextExpoResponse>(`${this.baseUrlNextExpo}/${id}`, updatedData, { headers: this.headers });
  }

  deleteNextExpobyId(id: string): Observable<NextExpoResponse> {
    return this.http.delete<NextExpoResponse>(`${this.baseUrlNextExpo}/${id}`, { headers: this.headers });
  }
}


