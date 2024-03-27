import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediationResponse } from '../../interfaces/mediation.interface';

@Injectable({
  providedIn: 'root'
})
export class MediationService {

  private baseUrl = 'http://localhost:5000/mediation';

  constructor(private http: HttpClient) { }

  getAllMediation(): Observable<MediationResponse> {
    return this.http.get<MediationResponse>(`${this.baseUrl}`);
  }
}
