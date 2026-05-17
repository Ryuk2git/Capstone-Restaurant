import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { User } from '../../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantManagerAssignmentDTO } from '../../model/restaurant-manager-assignment-dto';

@Component({
  selector: 'app-assignmanager',
  templateUrl: './assignmanager.component.html',
  styleUrls: ['./assignmanager.component.scss']
})
export class AssignmanagerComponent implements OnInit {
  restaurants: Restaurant[] = [];
  managers: User[] = [];
  assignForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.assignForm = this.fb.group({
      restaurantId: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadManagers();
  }

  loadManagers(): void {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.managers = users.filter(u => u.role === 'MANAGER');
      },
      error: (err) => console.error('Failed to load managers:', err)
    });
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => this.restaurants = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.assignForm.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload: any = {
      restaurantId: this.assignForm.value.restaurantId,
      user: this.assignForm.value.managerId
    };

    this.restaurantService.assignManager(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Manager assigned successfully!';
        this.assignForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to assign manager. Ensure the manager ID is valid and exists.';
        console.error(err);
      }
    });
  }
}
