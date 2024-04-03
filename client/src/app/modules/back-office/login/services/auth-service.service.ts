import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../notification-banner/services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/admin/login';
  private tokenKey: string = 'auth_token'
  private userKey: string = 'auth_user';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password })
      .pipe(
        tap(response => {
          // Stocker le token dans le local storage
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, response.name);
          this.isLoggedInSubject.next(true);
          this.notificationService.setNotification("Connexion réussie. Vous êtes maitenant connecté en tant qu'administrateur.  \u2713");
        }),
        catchError(this.handleError.bind(this))
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
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
    this.isLoggedInSubject.next(false);
    this.notificationService.setNotification('Déconnexion réussie. Vous êtes maintenant bien déconnecté.  \u2713');
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erreur inconnue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.notificationService.setNotification('Erreur lors de la tentative de connexion ! Veuillez réessayer. \u2613');
    console.error(errorMessage);
    return throwError({ message: errorMessage });
  }
}
