import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subject, Observable } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

import { Restaurant } from '../../model/restaurant';
import { Order } from '../../model/order';
import { MenuItem } from '../../model/menu-item';
import { Feedback } from '../../model/feedback';
import { Role } from '../../model/user';

import { AuthService } from '../../shared/services/auth.service';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { OrderService } from '../../shared/services/order.service';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { FeedbackService } from '../../shared/services/feedback-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser: any;

  isAdminUser = false;
  isManagerUser = false;
  isCustomerUser = false;

  restaurants: Restaurant[] = [];
  orders: Order[] = [];
  menuItems: MenuItem[] = [];
  feedbacks: Feedback[] = [];

  filteredRestaurants: Restaurant[] = [];
  filteredOrders: Order[] = [];
  filteredMenuItems: MenuItem[] = [];
  filteredFeedbacks: Feedback[] = [];

  searchRestaurant = '';
  searchOrder = '';
  searchMenuItem = '';
  searchFeedback = '';

  loading = false;

  isScrolled = false;
  private scrollTicking = false;

  totalRevenue = 0;
  averageRating = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private menuItemService: MenuItemService,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.isAdminUser = this.authService.hasRole(Role.ADMIN);
    this.isManagerUser = this.authService.hasRole(Role.MANAGER);
    this.isCustomerUser = this.authService.hasRole(Role.CUSTOMER);

    if (this.isAdminUser) {
      this.loadAdminDashboard();
    } else if (this.isManagerUser || this.isCustomerUser) {
      this.loadLimitedDashboard();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAdminDashboard(): void {
    this.loading = true;
    this.cdr.markForCheck();

    forkJoin({
      restaurants: this.restaurantService.getAllRestaurants().pipe(
        catchError(err => this.handleError<Restaurant[]>(err, []))
      ),
      orders: this.orderService.getAllOrders().pipe(
        catchError(err => this.handleError<Order[]>(err, []))
      ),
      menuItems: this.menuItemService.getAllMenuItems().pipe(
        catchError(err => this.handleError<MenuItem[]>(err, []))
      ),
      feedbacks: this.feedbackService.getAllFeedback().pipe(
        catchError(err => this.handleError<Feedback[]>(err, []))
      )
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(({ restaurants, orders, menuItems, feedbacks }) => {

        this.restaurants = restaurants;
        this.orders = orders;
        this.menuItems = menuItems;
        this.feedbacks = feedbacks;

        this.filteredRestaurants = restaurants;
        this.filteredOrders = orders;
        this.filteredMenuItems = menuItems;
        this.filteredFeedbacks = feedbacks;

        this.recomputeMetrics();
        this.cdr.markForCheck();
      });
  }

  private loadLimitedDashboard(): void {
    this.loading = true;
    this.cdr.markForCheck();

    forkJoin({
      restaurants: this.restaurantService.getAllRestaurants().pipe(
        catchError(err => this.handleError<Restaurant[]>(err, []))
      ),
      menuItems: this.menuItemService.getAllMenuItems().pipe(
        catchError(err => this.handleError<MenuItem[]>(err, []))
      )
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(({ restaurants, menuItems }) => {

        this.restaurants = restaurants;
        this.menuItems = menuItems;

        this.filteredRestaurants = restaurants;
        this.filteredMenuItems = menuItems;

        this.cdr.markForCheck();
      });
  }

  private recomputeMetrics(): void {
    this.totalRevenue = this.orders.reduce(
      (sum, o) => sum + (o?.totalAmount ?? 0),
      0
    );

    if (!this.feedbacks.length) {
      this.averageRating = 0;
      return;
    }

    const total = this.feedbacks.reduce(
      (sum, f) => sum + (f?.rating ?? 0),
      0
    );

    this.averageRating = Number(
      (total / this.feedbacks.length).toFixed(1)
    );
  }

  private normalize(value: any): string {
    return String(value ?? '').trim().toLowerCase();
  }

  private handleError<T>(err: any, fallback: T): Observable<T> {
    console.error(err);
    return of(fallback);
  }

  filterRestaurants(): void {
    const keyword = this.normalize(this.searchRestaurant);

    if (!keyword) {
      this.filteredRestaurants = this.restaurants;
      this.cdr.markForCheck();
      return;
    }

    this.filteredRestaurants = this.restaurants.filter(r =>
      this.normalize(r?.name).includes(keyword) ||
      this.normalize(r?.location).includes(keyword)
    );

    this.cdr.markForCheck();
  }

  filterOrders(): void {
    const keyword = this.normalize(this.searchOrder);

    if (!keyword) {
      this.filteredOrders = this.orders;
      this.cdr.markForCheck();
      return;
    }

    this.filteredOrders = this.orders.filter(o =>
      this.normalize(o?.customerName).includes(keyword) ||
      this.normalize(o?.status).includes(keyword)
    );

    this.cdr.markForCheck();
  }

  filterMenuItems(): void {
    const keyword = this.normalize(this.searchMenuItem);

    if (!keyword) {
      this.filteredMenuItems = this.menuItems;
      this.cdr.markForCheck();
      return;
    }

    this.filteredMenuItems = this.menuItems.filter(i =>
      this.normalize(i?.name).includes(keyword) ||
      this.normalize(i?.category).includes(keyword)
    );

    this.cdr.markForCheck();
  }

  filterFeedbacks(): void {
    const keyword = this.normalize(this.searchFeedback);

    if (!keyword) {
      this.filteredFeedbacks = this.feedbacks;
      this.cdr.markForCheck();
      return;
    }

    this.filteredFeedbacks = this.feedbacks.filter(f =>
      this.normalize(f?.customerName).includes(keyword) ||
      this.normalize(f?.comment).includes(keyword)
    );

    this.cdr.markForCheck();
  }

  addRestaurant(): void {
    this.router.navigate(['/restaurants/new']);
  }

  editRestaurant(id: number): void {
    this.router.navigate(['/restaurants/edit', id]);
  }

  deleteRestaurant(id: number): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.restaurantService.deleteRestaurant(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.restaurants = this.restaurants.filter(r => r.id !== id);
          this.filterRestaurants();
          this.cdr.markForCheck();
        },
        error: err => console.error(err)
      });
  }

  addMenuItem(): void {
    this.router.navigate(['/menu-items/new']);
  }

  editMenuItem(id: number): void {
    this.router.navigate(['/menu-items/edit', id]);
  }

  deleteMenuItem(id: number): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.menuItemService.deleteMenuItem(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.menuItems = this.menuItems.filter(m => m.id !== id);
          this.filterMenuItems();
          this.cdr.markForCheck();
        },
        error: err => console.error(err)
      });
  }

  addOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  editOrder(id: number): void {
    this.router.navigate(['/orders/edit', id]);
  }

  deleteOrder(id: number): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.orderService.deleteOrder(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== id);
          this.filterOrders();
          this.recomputeMetrics();
          this.cdr.markForCheck();
        },
        error: err => console.error(err)
      });
  }

  addFeedback(): void {
    this.router.navigate(['/feedbacks/new']);
  }

  editFeedback(id: number): void {
    this.router.navigate(['/feedbacks/edit', id]);
  }

  deleteFeedback(id: number): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.feedbackService.deleteFeedback(id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.feedbacks = this.feedbacks.filter(f => f.id !== id);
          this.filterFeedbacks();
          this.recomputeMetrics();
          this.cdr.markForCheck();
        },
        error: err => console.error(err)
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.scrollTicking) return;

    this.scrollTicking = true;

    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 30;

      if (this.isScrolled !== scrolled) {
        this.isScrolled = scrolled;
        this.cdr.markForCheck();
      }

      this.scrollTicking = false;
    });
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}