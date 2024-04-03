import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  private apiUrl = 'http://localhost:5000/member';

  constructor(private http: HttpClient) { }

  createMember(formDataMember: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, formDataMember);
  }

  getAllMembers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.members)
    );
  }
}
