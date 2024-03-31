import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class AuthAdminComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  submitLoginForm() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }
}
