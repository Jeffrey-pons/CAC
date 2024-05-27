import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/back-office/login/services/auth-service.service';
import { Subscription } from 'rxjs';
import { OnClickService } from '../../../utils/onClick.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('navbar') navbar!: ElementRef;

  isDropdownOpen: boolean = false;
  userInitial: string = '';
  isLoggedIn: boolean = false;
  private authSubscription: Subscription;
  isFirstImageHovered: boolean = false
  intervalId: number | undefined;

  constructor(private router: Router, private authService: AuthService, private onClickService: OnClickService) {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadUserInitial();
      } else {
        this.userInitial = '';
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

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.intervalId = window.setInterval(() => {
          this.isFirstImageHovered = !this.isFirstImageHovered;
        }, 5000);
      } else {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }
    });

    observer.observe(this.navbar.nativeElement);
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
  handleFocus() {
    this.onClickService.handleFocus();
  }

  handleBlur() {
    this.onClickService.handleBlur();
  }

  handleClick() {
    this.onClickService.handleClick();
  }

  handleKeyUp(event: KeyboardEvent) {
    this.onClickService.handleKeyUp(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.onClickService.handleKeyDown(event);
  }
}


