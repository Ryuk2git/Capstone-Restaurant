import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Role } from '../../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: any;

  isAdminUser = false;
  isManagerUser = false;
  isCustomerUser = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    this.isAdminUser = this.authService.hasRole(Role.ADMIN);
    this.isManagerUser = this.authService.hasRole(Role.MANAGER);
    this.isCustomerUser = this.authService.hasRole(Role.CUSTOMER);

  }

  logout(): void {
    this.authService.logout();
  }

}