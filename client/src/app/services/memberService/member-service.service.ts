import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  private apiUrl = 'http://localhost:5000/member/register';

  constructor(private http: HttpClient) { }

  createMember(formDataMember: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formDataMember);
  }

}
