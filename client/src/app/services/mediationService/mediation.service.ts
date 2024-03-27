import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediationService {

  private baseUrl = 'http://localhost:5000/mediation';

  constructor(private http: HttpClient) { }

  getAllMediation(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
