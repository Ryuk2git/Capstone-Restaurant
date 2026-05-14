import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { MenuItem } from '../../model/menu-item';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Restaurant } from '../../model/restaurant';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
   menuForm: FormGroup;
  menuItems: MenuItem[] = [];
  restaurants: Restaurant[] = [];

  editingId: number | null = null;
  message = '';
  errorMessage = '';
  searchText = '';

  constructor(
    private fb: FormBuilder,
    private menuItemService: MenuItemService,
    private restaurantService: RestaurantService
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      menuType: ['Veg', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      
quantity: ['', [Validators.required, Validators.min(1)]],
      restaurantId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMenuItems();
    this.loadRestaurants();
  }

  loadMenuItems(): void {
    this.menuItemService.getMenuItems().subscribe({
      next: (data) => this.menuItems = data,
      error: () => this.errorMessage = 'Unable to load menu items'
    });
  }
  
loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => this.restaurants = data,
      error: () => this.errorMessage = 'Unable to load restaurants'
    });
  }

  saveMenuItem(): void {
    if (this.menuForm.invalid) {
      this.errorMessage = 'Please fill all menu item details correctly';
      return;
    }

    const item: MenuItem = {
      name: this.menuForm.value.name,
      menuType: this.menuForm.value.menuType,
      price: Number(this.menuForm.value.price),
      quantity: Number(this.menuForm.value.quantity),
      restaurant: {
        id: Number(this.menuForm.value.restaurantId),
        name: '',
        location: '',
        address: '',
        email: '',
        phNumber: 0,
        menuItems: []
      }
    };
    
if (this.editingId) {
      this.menuItemService.updateMenuItem(this.editingId, item).subscribe({
        next: () => {
          this.message = 'Menu item updated successfully';
          this.resetForm();
          this.loadMenuItems();
        },
        error: (error) => this.errorMessage = error.error || 'Update failed'
      });
    } else {
      this.menuItemService.addMenuItem(item).subscribe({
        next: () => {
          this.message = 'Menu item added successfully';
          this.resetForm();
          this.loadMenuItems();
        },
        error: (error) => this.errorMessage = error.error || 'Create failed'
      });
    }
  }
editMenuItem(item: MenuItem): void {
    this.editingId = item.id || null;

    this.menuForm.patchValue({
      name: item.name,
      menuType: item.menuType,
      price: item.price,
      quantity: item.quantity,
      restaurantId: item.restaurant?.id
    });
  }
  
deleteMenuItem(id?: number): void {
    if (!id) return;

    if (confirm('Delete this menu item?')) {
      this.menuItemService.deleteMenuItem(id).subscribe({
        next: () => {
          this.message = 'Menu item deleted successfully';
          this.loadMenuItems();
        },
        error: (error) => this.errorMessage = error.error || 'Delete failed'
      });
    }
  }
  
search(): void {
    if (!this.searchText.trim()) {
      this.loadMenuItems();
      return;
    }

    this.menuItemService.searchByName(this.searchText).subscribe({
      next: (data) => this.menuItems = data,
      error: () => this.errorMessage = 'Search failed'
    });
  }
  
resetForm(): void {
    this.menuForm.reset({
      menuType: 'Veg'
    });
    this.editingId = null;
    this.errorMessage = '';
  }




}