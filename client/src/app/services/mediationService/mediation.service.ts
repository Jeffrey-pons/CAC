import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MediationResponse } from '../../interfaces/mediation.interface';

@Injectable({
  providedIn: 'root'
})
export class MediationService {

  private baseUrlMediation = 'http://localhost:5000/mediation';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createMediation(newMediationData: any): Observable<any> {
    const formData = new FormData();
    for (const key in newMediationData) {
      if (newMediationData.hasOwnProperty(key)) {
        formData.append(key, newMediationData[key]);
      }
    }
    return this.http.post<any>(`${this.baseUrlMediation}`, formData, { headers: this.headers });
  }

  getAllMediation(): Observable<MediationResponse> {
    return this.http.get<MediationResponse>(`${this.baseUrlMediation}`);
  }

  getMediationById(mediationId: string): Observable<MediationResponse> {
    return this.http.get<MediationResponse>(`${this.baseUrlMediation}/${mediationId}`);
  }

  updateMediation(mediationId: string, updatedData: any): Observable<MediationResponse> {
    return this.http.patch<MediationResponse>(`${this.baseUrlMediation}/${mediationId}`, updatedData, { headers: this.headers });
  }

  deleteMediation(mediationId: string): Observable<MediationResponse> {
    return this.http.delete<MediationResponse>(`${this.baseUrlMediation}/${mediationId}`, {headers: this.headers});
  }
}
