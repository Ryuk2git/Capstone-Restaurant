import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../model/order';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { MenuItem } from '../../model/menu-item';
import { Restaurant } from '../../model/restaurant';
import { User } from '../../model/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
   
 restaurants: Restaurant[] = [];
  menuItems: MenuItem[] = [];
  selectedItems: MenuItem[] = [];
  orders: Order[] = [];

  selectedRestaurantId = 0;
  totalAmount = 0;

  message = '';
  errorMessage = '';

  constructor(
    private restaurantService: RestaurantService,
    private menuItemService: MenuItemService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadOrderHistory();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => this.restaurants = data,
      error: () => this.errorMessage = 'Unable to load restaurants'
    });
  }

  loadMenuItems(): void {
    if (!this.selectedRestaurantId) {
      this.menuItems = [];
      return;
    }

    this.menuItemService.getMenuItemsByRestaurant(Number(this.selectedRestaurantId)).subscribe({
      next: (data) => {
        this.menuItems = data;
        this.selectedItems = [];
        this.calculateTotal();
      },
      error: () => this.errorMessage = 'Unable to load menu items'
    });
  }

  toggleItem(item: MenuItem, event: any): void {
    if (event.target.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
    }

    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.selectedItems.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder(): void {
    if (!this.selectedRestaurantId) {
      this.errorMessage = 'Please select a restaurant';
      return;
    }

    if (this.selectedItems.length === 0) {
      this.errorMessage = 'Please select at least one menu item';
      return;
    }

    const order: Order = {
      customerName: this.authService.getUsername() || 'Customer',
      restaurant: {
        id: Number(this.selectedRestaurantId),
        name: '',
        location: '',
        address: '',
        email: '',
        phNumber: 0,
        menuItems: []
      },
      items: this.selectedItems.map(item => ({ id: item.id } as MenuItem)),
      user: {
        id: this.authService.getUserId(),
        username: '',
        email: '',
        role: 'CUSTOMER',
        orders: []
      }
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        this.message = 'Order placed successfully';
        this.errorMessage = '';
        this.selectedItems = [];
        this.totalAmount = 0;
        this.loadMenuItems();
        this.loadOrderHistory();
      },
      error: (error) => {
        this.errorMessage = error.error || 'Order failed';
        this.message = '';
      }
    });
  }

  loadOrderHistory(): void {
    this.orderService.getOrdersByUser(this.authService.getUserId()).subscribe({
      next: (data) => this.orders = data,
      error: () => this.errorMessage = 'Unable to load order history'
    });
  }

  cancelOrder(id?: number): void {
    if (!id) return;

    if (confirm('Cancel this order?')) {
      this.orderService.cancelOrder(id).subscribe({
        next: () => {
          this.message = 'Order cancelled successfully';
          this.loadOrderHistory();
        },
        error: (error) => this.errorMessage = error.error || 'Cancel failed'
      });
    }
  }


}
