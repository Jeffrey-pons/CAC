import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NextExpoResponse } from '../../interfaces/nextExpo.interface';

@Injectable({
  providedIn: 'root'
})
export class NextExpoServiceService {

  private baseUrl = 'http://localhost:5000/next-exposition';

  constructor(private http: HttpClient) { }

  getNextExpo(): Observable<NextExpoResponse> {
    return this.http.get<NextExpoResponse>(`${this.baseUrl}`);
  }

  getNextExpoById(id: string): Observable<NextExpoResponse> {
    return this.http.get<NextExpoResponse>(`${this.baseUrl}/${id}`);
  }
}


