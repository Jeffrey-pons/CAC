import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/admin/login';
  private tokenKey: string = 'auth_token'
  private userKey: string = 'auth_user';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password })
      .pipe(
        tap(response => {
          // Stocker le token dans le local storage
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, response.name);
        }),
        catchError(this.handleError)
      );
  }

  getUser(): string | null {
    return  localStorage.getItem(this.userKey);
  
  }

  setUser(name: string): void {
    localStorage.setItem(this.userKey, JSON.stringify(name));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }


  private handleError(error: any) {
    let errorMessage = 'Erreur inconnue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError({ message: errorMessage });
  }
}
