import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { Role } from '../../model/user';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];

  searchText = '';
  loading = false;
  errorMessage = '';

  isAdminUser = false;
  isManagerUser = false;
  isCustomerUser = false;

  // Expand row support
  expandedRestaurantId: number | null = null;
  expandedRestaurantName = '';

  // Form
  showForm = false;
  isEditMode = false;

  currentRestaurant: Restaurant = this.emptyRestaurant();

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.hasRole(Role.ADMIN);
    this.isManagerUser = this.authService.hasRole(Role.MANAGER);
    this.isCustomerUser = this.authService.hasRole(Role.CUSTOMER);

    this.loadRestaurants();
  }

  get canManage(): boolean {
    return this.isAdminUser || this.isManagerUser;
  }

  loadRestaurants(): void {
    this.loading = true;
    this.errorMessage = '';

    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data || [];
        this.filteredRestaurants = [...this.restaurants];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load restaurants.';
        this.loading = false;
      }
    });
  }

  filterRestaurants(): void {
    const k = this.normalize(this.searchText);

    if (!k) {
      this.filteredRestaurants = [...this.restaurants];
      return;
    }

    this.filteredRestaurants = this.restaurants.filter(r => {
      return (
        this.normalize(r?.name).includes(k) ||
        this.normalize(r?.location).includes(k) ||
        this.normalize(r?.address).includes(k) ||
        this.normalize(r?.email).includes(k) ||
        this.normalize(r?.phoneNumber).includes(k)
      );
    });
  }

  // Expand/collapse on row click
  toggleExpand(r: Restaurant): void {
    if (this.expandedRestaurantId === r.id) {
      this.expandedRestaurantId = null;
      this.expandedRestaurantName = '';
      return;
    }

    this.expandedRestaurantId = r.id;
    this.expandedRestaurantName = r.name;
  }

  openAddForm(): void {
    if (!this.canManage) return;
    this.showForm = true;
    this.isEditMode = false;
    this.errorMessage = '';
    this.currentRestaurant = this.emptyRestaurant();
  }

  openEditForm(r: Restaurant): void {
    if (!this.canManage) return;
    this.showForm = true;
    this.isEditMode = true;
    this.errorMessage = '';
    this.currentRestaurant = {
      ...r,
      manager: r.manager,
      menuItems: r.menuItems || []
    };
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.errorMessage = '';
    this.currentRestaurant = this.emptyRestaurant();
  }

  saveRestaurant(): void {
    if (!this.canManage) return;

    if (!this.currentRestaurant.menuItems) {
      this.currentRestaurant.menuItems = [];
    }

    if (!this.currentRestaurant.name?.trim() ||
        !this.currentRestaurant.location?.trim() ||
        !this.currentRestaurant.address?.trim() ||
        !this.currentRestaurant.email?.trim() ||
        !this.currentRestaurant.phoneNumber?.trim()) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (this.isEditMode) {
      this.restaurantService.updateRestaurant(this.currentRestaurant.id, this.currentRestaurant).subscribe({
        next: () => {
          this.loadRestaurants();
          this.cancelForm();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to update restaurant.';
        }
      });
    } else {
      const payload: Restaurant = {
        ...this.currentRestaurant,
        id: 0,
        manager: undefined,
        menuItems: []
      };

      this.restaurantService.addRestaurant(payload).subscribe({
        next: () => {
          this.loadRestaurants();
          this.cancelForm();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to add restaurant.';
        }
      });
    }
  }

  deleteRestaurant(id: number): void {
    if (!this.canManage) return;

    const ok = confirm('Are you sure you want to delete this restaurant?');
    if (!ok) return;

    this.restaurantService.deleteRestaurant(id).subscribe({
      next: () => {
        this.restaurants = this.restaurants.filter(r => r.id !== id);
        this.filterRestaurants();

        if (this.expandedRestaurantId === id) {
          this.expandedRestaurantId = null;
          this.expandedRestaurantName = '';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to delete restaurant.';
      }
    });
  }

  trackById(index: number, item: Restaurant): number {
    return item.id;
  }

  private normalize(v: any): string {
    return String(v ?? '').trim().toLowerCase();
  }

  private emptyRestaurant(): Restaurant {
    return {
      id: 0,
      name: '',
      location: '',
      address: '',
      email: '',
      phoneNumber: '',
      manager: undefined,
      menuItems: []
    };
  }
}