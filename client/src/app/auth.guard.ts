import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Role } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {

    // Not logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Admin check
    if (this.authService.getRole() === Role.ADMIN) {
      return true;
    }

    // Unauthorized
    this.router.navigate(['/dashboard']);
    return false;
  }
}