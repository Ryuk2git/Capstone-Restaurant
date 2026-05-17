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
  expandedRestaurantId: number | null = null;
  expandedRestaurantName = '';
  showForm = false;
  isEditMode = false;
  currentRestaurant: Restaurant = this.emptyRestaurant();

  // Universal Phone Regex used in HTML pattern attribute
  readonly phoneRegex = "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$";

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

  get canManage(): boolean { return this.isAdminUser; }

  canManageMenuItem(r: Restaurant): boolean {
    return this.isAdminUser || this.isManagerUser;
  }

  loadRestaurants(): void {
    this.loading = true;
    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        const all = data || [];
        if (this.isManagerUser) {
          const currentUser = this.authService.getCurrentUser();
          this.restaurantService.getAssignmentsByManager(currentUser?.id ?? 0).subscribe({
            next: (assignments) => {
              const assignedNames = new Set(assignments.map((a: any) => a.restaurantName));
              this.restaurants = all.filter(r => assignedNames.has(r.name));
              this.filteredRestaurants = [...this.restaurants];
              this.loading = false;
            },
            error: () => { this.loading = false; }
          });
        } else {
          this.restaurants = all;
          this.filteredRestaurants = [...this.restaurants];
          this.loading = false;
        }
      },
      error: () => { this.loading = false; this.errorMessage = 'Failed to load.'; }
    });
  }

  filterRestaurants(): void {
    const k = this.searchText.toLowerCase().trim();
    this.filteredRestaurants = k ? this.restaurants.filter(r => 
      r.name.toLowerCase().includes(k) || r.location.toLowerCase().includes(k)
    ) : [...this.restaurants];
  }

  toggleExpand(r: Restaurant): void {
    this.expandedRestaurantId = this.expandedRestaurantId === r.id ? null : r.id;
  }

  openAddForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.currentRestaurant = this.emptyRestaurant();
  }

  openEditForm(r: Restaurant): void {
    this.showForm = true;
    this.isEditMode = true;
    this.currentRestaurant = { ...r };
  }

  cancelForm(): void { this.showForm = false; }

  saveRestaurant(): void {
    const obs = this.isEditMode 
      ? this.restaurantService.updateRestaurant(this.currentRestaurant.id, this.currentRestaurant)
      : this.restaurantService.addRestaurant({ ...this.currentRestaurant, menuItems: [] });

    obs.subscribe({
      next: () => { this.loadRestaurants(); this.cancelForm(); },
      error: () => this.errorMessage = 'Operation failed.'
    });
  }

  deleteRestaurant(id: number): void {
    if (confirm('Delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe(() => this.loadRestaurants());
    }
  }

  trackById(index: number, item: Restaurant): number { return item.id; }

  private emptyRestaurant(): Restaurant {
    return { id: 0, name: '', location: '', address: '', email: '', phoneNumber: '', menuItems: [] };
  }
}