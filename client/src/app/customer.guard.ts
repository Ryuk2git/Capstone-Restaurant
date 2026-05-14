import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getRole() === 'CUSTOMER') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}