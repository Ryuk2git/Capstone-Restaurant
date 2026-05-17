import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Role } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // Not logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = route.data['roles'] as Array<Role>;
    if (expectedRoles && expectedRoles.length > 0) {
      const userRole = this.authService.getRole();
      if (!userRole || !expectedRoles.includes(userRole)) {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    return true;
  }
}