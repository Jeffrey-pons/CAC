import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archive, ArchiveResponse } from '../../interfaces/archives.interface';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {
  private baseUrlArchive = 'http://localhost:5000/archive';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('auth_token') || '';
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  createArchive(newArchiveData: any): Observable<any> {
    const formData = new FormData();
    for (const key in newArchiveData) {
      if (newArchiveData.hasOwnProperty(key)) {
        formData.append(key, newArchiveData[key]);
      }
    }
    return this.http.post<any>(`${this.baseUrlArchive}`, formData, { headers: this.headers });
  }

  getArchives(): Observable<ArchiveResponse> {
    return this.http.get<ArchiveResponse>(`${this.baseUrlArchive}`);
  }

  getArchivesById(id: string): Observable<ArchiveResponse> {
    return this.http.get<ArchiveResponse>(`${this.baseUrlArchive}/${id}`);
  }

  updateArchive(id: string, updatedData: any): Observable<ArchiveResponse> {
    return this.http.patch<ArchiveResponse>(`${this.baseUrlArchive}/${id}`, updatedData, { headers: this.headers });
  }

  deleteArchivebyId(id: string): Observable<ArchiveResponse> {
    return this.http.delete<ArchiveResponse>(`${this.baseUrlArchive}/${id}`, { headers: this.headers });
  }
}
