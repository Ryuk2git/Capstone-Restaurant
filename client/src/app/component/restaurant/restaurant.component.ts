import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { AuthService } from '../../shared/services/auth.service';
import { Restaurant } from '../../model/restaurant';
import { MenuItem } from '../../model/menu-item';
import { User } from '../../model/user';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent{
  
restaurantForm: FormGroup;
  restaurants: Restaurant[] = [];

  editingId: number | null = null;

  searchText = '';
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
      },
      error: () => {
        this.errorMessage = 'Unable to load restaurants';
      }
    });
  }

  saveRestaurant(): void {
    this.clearMessages();

    if (this.restaurantForm.invalid) {
      this.restaurantForm.markAllAsTouched();
      this.errorMessage = 'Please fill all restaurant details correctly';
      return;
    }

    const restaurant: Restaurant = {
      name: this.restaurantForm.value.name,
      location: this.restaurantForm.value.location,
      address: this.restaurantForm.value.address,
      email: this.restaurantForm.value.email,
      phNumber: Number(this.restaurantForm.value.phNumber),
      menuItems: []
    };

    if (this.editingId !== null) {
      this.updateRestaurant(restaurant);
    } else {
      this.createRestaurant(restaurant);
    }
  }

  createRestaurant(restaurant: Restaurant): void {
    this.restaurantService.createRestaurant(restaurant).subscribe({
      next: () => {
        this.message = 'Restaurant created successfully';
        this.resetForm();
        this.loadRestaurants();
      },
      error: (error) => {
        this.errorMessage = error.error || 'Restaurant creation failed';
      }
    });
  }

  updateRestaurant(restaurant: Restaurant): void {
    if (this.editingId === null) {
      return;
    }

    this.restaurantService.updateRestaurant(this.editingId, restaurant).subscribe({
      next: () => {
        this.message = 'Restaurant updated successfully';
        this.resetForm();
        this.loadRestaurants();
      },
      error: (error) => {
        this.errorMessage = error.error || 'Restaurant update failed';
      }
    });
  }

  editRestaurant(restaurant: Restaurant): void {
    this.editingId = restaurant.id || null;

    this.restaurantForm.patchValue({
      name: restaurant.name,
      location: restaurant.location,
      address: restaurant.address,
      email: restaurant.email,
      phNumber: restaurant.phNumber
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteRestaurant(id?: number): void {
    if (!id) {
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this restaurant?');

    if (!confirmDelete) {
      return;
    }

    this.clearMessages();

    this.restaurantService.deleteRestaurant(id).subscribe({
      next: () => {
        this.message = 'Restaurant deleted successfully';
        this.loadRestaurants();
      },
      error: (error) => {
        this.errorMessage = error.error || 'Restaurant delete failed';
      }
    });
  }

  searchRestaurant(): void {
    this.clearMessages();

    if (!this.searchText.trim()) {
      this.loadRestaurants();
      return;
    }

    this.restaurantService.searchByName(this.searchText.trim()).subscribe({
      next: (data) => {
        this.restaurants = data;
      },
      error: () => {
        this.errorMessage = 'Restaurant search failed';
      }
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.loadRestaurants();
  }

  resetForm(): void {
    this.restaurantForm.reset();
    this.editingId = null;
  }

  clearMessages(): void {
    this.message = '';
    this.errorMessage = '';
  }


}
