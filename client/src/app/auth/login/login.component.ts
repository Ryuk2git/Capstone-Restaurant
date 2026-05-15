import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../model/loginrequest';
import { AuthService } from '../../shared/services/auth.service';
import { Role } from '../../model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  rememberMe = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit(form: NgForm): void {
    if (form.invalid) return;
    this.errorMessage = '';
    this.authService.login(this.loginData, this.rememberMe).subscribe({
      next: () => { 
        console.log("Login Successfull");
        this.router.navigate(['/dashboard'])
      },
      error: () => this.errorMessage = 'Invalid username or password'
    });
  }

}


