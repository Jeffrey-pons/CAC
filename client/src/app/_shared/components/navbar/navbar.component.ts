import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/back-office/login/services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  isDropdownOpen: boolean = false;
  userInitial: string = '';
  isLoggedIn: boolean = false;
  private authSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadUserInitial();
      } else {
        this.userInitial = ''; // Réinitialiser la lettre de l'utilisateur lors de la déconnexion
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadUserInitial();
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  loadUserInitial(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userInitial = user.charAt(0).toUpperCase();
    }
  }

  isLoggedInToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToBackOffice(): void {
    this.router.navigate(['/admin/account']);
  }

  logout(): void {
    // Déconnexion de l'utilisateur
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLinkActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

  isFirstImageHovered: boolean = true;

  handleHover() {
    this.isFirstImageHovered = !this.isFirstImageHovered;
  }

  handleMouseOut() {
    //none
  }
}

