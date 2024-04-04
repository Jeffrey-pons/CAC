import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Member, MemberResponse } from '../../interfaces/members.interface';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  private baseUrlMember = 'http://localhost:5000/member';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createMember(formDataMember: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlMember}/register`, formDataMember);
  }

  getAllMembers(): Observable<MemberResponse> {
    return this.http.get<MemberResponse>(this.baseUrlMember, { headers: this.headers });
  }
  updateMember(memberId: string, updatedData: any): Observable<MemberResponse> {
    return this.http.patch<MemberResponse>(`${this.baseUrlMember}/${memberId}`, updatedData, { headers: this.headers });
  }

  deleteMember(memberId: string): Observable<MemberResponse> {
    return this.http.delete<MemberResponse>(`${this.baseUrlMember}/${memberId}`, { headers: this.headers });
  }
}
