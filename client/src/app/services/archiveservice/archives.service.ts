import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {
  private baseUrl = 'http://localhost:5000/archive';

  constructor(private http: HttpClient) { }

  getArchives(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
