import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../model/feedback';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Restaurant } from '../../model/restaurant';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { MenuItem } from '../../model/menu-item';
import { AuthService } from '../../shared/services/auth.service';
import { User, Role } from '../../model/user';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  restaurants: Restaurant[] = [];
  menuItems: MenuItem[] = [];

  loading = false;
  errorMessage = '';

  isAdminUser = false;
  isManagerUser = false;
  isCustomerUser = false;
  currentUser: any;

  // Form for Customer
  showForm = false;
  isEditMode = false;
  feedbackForm!: FormGroup;
  currentFeedbackId: number | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private restaurantService: RestaurantService,
    private menuItemService: MenuItemService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdminUser = this.authService.hasRole(Role.ADMIN);
    this.isManagerUser = this.authService.hasRole(Role.MANAGER);
    this.isCustomerUser = this.authService.hasRole(Role.CUSTOMER);

    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.feedbackForm = this.fb.group({
      restaurantId: ['', Validators.required],
      menuItemId: [''],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  loadData(): void {
    this.loading = true;
    this.restaurantService.getAllRestaurants().subscribe(res => {
      this.restaurants = res;
    });
    this.menuItemService.getAllMenuItems().subscribe(items => {
      this.menuItems = items;
    });

    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        let all = data || [];
        
        if (this.isManagerUser) {
          // Managers see feedback for their assigned restaurant(s)
          this.restaurantService.getAssignmentsByManager(this.currentUser?.id ?? 0).subscribe({
            next: (assignments) => {
              const assignedNames = new Set(assignments.map((a: any) => a.restaurantName));
              all = all.filter(f => assignedNames.has(f.restaurant?.name));
              this.feedbacks = all;
              this.filteredFeedbacks = [...this.feedbacks];
              this.loading = false;
            },
            error: () => {
              this.feedbacks = all;
              this.filteredFeedbacks = [...this.feedbacks];
              this.loading = false;
            }
          });
          return;
        } else if (this.isCustomerUser) {
          // Customers only see their own feedback
          all = all.filter(f => f.customerName === this.currentUser?.username);
        }
        
        this.feedbacks = all;
        this.filteredFeedbacks = [...this.feedbacks];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load feedback';
        this.loading = false;
      }
    });
  }

  openAddForm(): void {
    this.showForm = true;
    this.isEditMode = false;
    this.feedbackForm.reset({ rating: 5 });
    this.currentFeedbackId = null;
  }

  openEditForm(f: Feedback): void {
    this.showForm = true;
    this.isEditMode = true;
    this.currentFeedbackId = f.id;
    this.feedbackForm.patchValue({
      restaurantId: f.restaurant?.id,
      menuItemId: f.menuItem?.id,
      rating: f.rating,
      comment: f.comment
    });
  }

  cancelForm(): void {
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) return;

    const val = this.feedbackForm.value;
    const payload: any = {
      customerName: this.currentUser?.username,
      comment: val.comment,
      rating: val.rating,
      restaurant: { id: val.restaurantId }
    };
    if (val.menuItemId) {
      payload.menuItem = { id: val.menuItemId };
    } else {
      payload.menuItem = null;
    }

    if (this.isEditMode && this.currentFeedbackId) {
      this.feedbackService.updateFeedback(this.currentFeedbackId, payload).subscribe({
        next: () => {
          this.loadData();
          this.cancelForm();
        },
        error: () => this.errorMessage = 'Failed to update feedback'
      });
    } else {
      this.feedbackService.addFeedback(payload).subscribe({
        next: () => {
          this.loadData();
          this.cancelForm();
        },
        error: () => this.errorMessage = 'Failed to submit feedback'
      });
    }
  }

  deleteFeedback(id: number): void {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    this.feedbackService.deleteFeedback(id).subscribe({
      next: () => {
        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
        this.filteredFeedbacks = [...this.feedbacks];
      },
      error: () => this.errorMessage = 'Failed to delete feedback'
    });
  }
}
