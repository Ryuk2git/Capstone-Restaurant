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
export class AssignmanagerComponent  {

   
assignForm: FormGroup;

  restaurants: Restaurant[] = [];
  managers: User[] = [];
  assignments: RestaurantManagerAssignmentDTO[] = [];

  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) {
    this.assignForm = this.fb.group({
      restaurantId: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }
  
ngOnInit(): void {
    this.loadRestaurants();
    this.loadManagers();
    this.loadAssignments();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => this.restaurants = data,
      error: () => this.errorMessage = 'Unable to load restaurants'
    });
  }

  loadManagers(): void {
    this.authService.getManagers().subscribe({
      next: (data) => this.managers = data,
      error: () => this.errorMessage = 'Unable to load managers'
    });
    
}

  loadAssignments(): void {
    this.restaurantService.getAssignments().subscribe({
      next: (data) => this.assignments = data,
      error: () => this.errorMessage = 'Unable to load assignments'
    });
  }

  assignManager(): void {
    if (this.assignForm.invalid) {
      this.errorMessage = 'Please select restaurant and manager';
      return;
    }
    
const request: RestaurantManagerAssignmentDTO = {
  restaurantId: Number(this.assignForm.value.restaurantId),
  managerId: Number(this.assignForm.value.managerId),
  assignedBy: this.authService.getUserId(),
  assignedAt: ''
};

    this.restaurantService.assignManager(request).subscribe({
      next: () => {
        this.message = 'Manager assigned successfully';
        this.errorMessage = '';
        this.assignForm.reset();
        this.loadAssignments();
      },
      error: (error) => {
        this.errorMessage = error.error || 'Assignment failed';
        this.message = '';
      }
      
});
  }

  deleteAssignment(id?: number): void {
    if (!id) return;

    if (confirm('Delete this assignment?')) {
      this.restaurantService.deleteAssignment(id).subscribe({
        next: () => {
          this.message = 'Assignment deleted successfully';
          this.loadAssignments();
        },
        error: (error) => this.errorMessage = error.error || 'Delete failed'
      });
    }
  }
}



