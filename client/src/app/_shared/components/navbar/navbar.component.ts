import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/back-office/login/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isDropdownOpen: boolean = false;
  userInitial: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadUserInitial();
  }

  loadUserInitial(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userInitial = user.charAt(0).toUpperCase();
    }
  }

  isLoggedIn(): boolean {
    // Vérifie si l'utilisateur est connecté en vérifiant la présence du token
    return !!localStorage.getItem('auth_token');
  }

  // getUser(): User | null {
  //   return this.authService.getUser();
  // }

  // getUserInitial(): string {
  //   const user = this.getUser();
  //   return user ? user.name[0].toUpperCase() : '';
  // }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToBackOffice(): void {
    // Redirection vers la page Back Office
    // À implémenter selon votre structure de routage
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

