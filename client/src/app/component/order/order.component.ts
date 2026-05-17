import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../model/order';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Restaurant } from '../../model/restaurant';
import { AuthService } from '../../shared/services/auth.service';
import { Role } from '../../model/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  restaurants: Restaurant[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  isAdminUser = false;
  isManagerUser = false;
  isCustomerUser = false;
  currentUser: any;

  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdminUser = this.authService.hasRole(Role.ADMIN);
    this.isManagerUser = this.authService.hasRole(Role.MANAGER);
    this.isCustomerUser = this.authService.hasRole(Role.CUSTOMER);
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        let all = data || [];

        if (this.isManagerUser) {
          // Filter by restaurants assigned to this manager via assignment service
          this.restaurantService.getAssignmentsByManager(this.currentUser?.id ?? 0).subscribe({
            next: (assignments) => {
              const assignedNames = new Set(assignments.map((a: any) => a.restaurantName));
              this.orders = all.filter(o => assignedNames.has(o.restaurant?.name));
              this.filteredOrders = [...this.orders];
              this.loading = false;
            },
            error: () => {
              this.orders = all;
              this.filteredOrders = [...this.orders];
              this.loading = false;
            }
          });
        } else if (this.isCustomerUser) {
          this.orders = all.filter(o =>
            o.customerName === this.currentUser?.username ||
            (o as any).user?.id === this.currentUser?.id
          );
          this.filteredOrders = [...this.orders];
          this.loading = false;
        } else {
          // Admin sees all
          this.orders = all;
          this.filteredOrders = [...this.orders];
          this.loading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  updateOrderStatus(orderId: number, status: string): void {
    if (!this.isAdminUser && !this.isManagerUser) return;

    const orderToUpdate = this.orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;

    const updated = { ...orderToUpdate, status };

    this.orderService.updateOrder(orderId, updated as Order).subscribe({
      next: () => {
        orderToUpdate.status = status;
        this.successMessage = 'Order status updated!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to update order status';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}
