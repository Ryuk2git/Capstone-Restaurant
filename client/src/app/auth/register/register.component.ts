import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  
registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['CUSTOMER', Validators.required]
    });
  }
  
register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    const user: User = this.registerForm.value;

    this.authService.register(user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful. Redirecting to login...';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        
this.errorMessage = error.error || 'Registration failed';
        this.successMessage = '';
      }
    });
  }

 

}


