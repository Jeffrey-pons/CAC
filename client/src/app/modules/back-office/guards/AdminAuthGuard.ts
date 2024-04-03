import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../login/services/auth-service.service';
import { NotificationService } from '../notification-banner/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.notificationService.setNotification("Accès non autorisé. Vous n'êtes pas reconnu comme étant administrateur du site. Vous n'avez donc pas accès à cette route. \u2613");
      this.router.navigate(['/']);
      return false;
    }
  }
}
