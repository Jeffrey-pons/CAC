import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, AdminResponse } from '../../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrlAdmin = 'http://localhost:5000/admin';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createAdmin(formDataAdmin: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlAdmin}/register`, formDataAdmin,  { headers: this.headers });
  }

  // Gestion login in component login

  getAllAdmins(): Observable<AdminResponse> {
    return this.http.get<AdminResponse>(this.baseUrlAdmin, { headers: this.headers });
  }

  updateAdmin(adminId: string, updatedData: any): Observable<AdminResponse> {
    return this.http.patch<AdminResponse>(`${this.baseUrlAdmin}/${adminId}`, updatedData, { headers: this.headers });
  }

  deleteAdmin(adminId: string): Observable<AdminResponse> {
    return this.http.delete<AdminResponse>(`${this.baseUrlAdmin}/${adminId}`, { headers: this.headers });
  }
}
