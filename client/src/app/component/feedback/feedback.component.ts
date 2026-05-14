import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../model/feedback';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Restaurant } from '../../model/restaurant';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { MenuItem } from '../../model/menu-item';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{


feedbackForm: FormGroup;

  feedbackList: Feedback[] = [];
  menuItems: MenuItem[] = [];

  role: string | null = '';
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private menuItemService: MenuItemService,
    private authService: AuthService
  ) {
    this.feedbackForm = this.fb.group({
      menuItemId: ['', Validators.required],
      comment: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    this.role = this.authService.getRole();
  }

  ngOnInit(): void {
    this.loadMenuItems();
    this.loadFeedback();
  }

  loadMenuItems(): void {
    this.menuItemService.getMenuItems().subscribe({
      next: (data) => this.menuItems = data,
      error: () => this.errorMessage = 'Unable to load menu items'
    });
  }

  loadFeedback(): void {
    this.feedbackService.getFeedback().subscribe({
      next: (data) => this.feedbackList = data,
      error: () => this.errorMessage = 'Unable to load feedback'
    });
  }

  submitFeedback(): void {
    if (this.feedbackForm.invalid) {
      this.errorMessage = 'Please fill feedback correctly';
      return;
    }

    const feedback: Feedback = {
      customerName: this.authService.getUsername() || 'Customer',
      comment: this.feedbackForm.value.comment,
      rating: Number(this.feedbackForm.value.rating),
      menuItem: {
        id: Number(this.feedbackForm.value.menuItemId),
        name: '',
        menuType: '',
        price: 0,
        quantity: 0
      }
    };

    this.feedbackService.submitFeedback(feedback).subscribe({
      next: () => {
        this.message = 'Feedback submitted successfully';
        this.errorMessage = '';
        this.feedbackForm.reset();
        this.loadFeedback();
      },
      error: (error) => {
        this.errorMessage = error.error || 'Feedback submission failed';
        this.message = '';
      }
    });
  }

  deleteFeedback(id?: number): void {
    if (!id) return;

    if (confirm('Delete this feedback?')) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          this.message = 'Feedback deleted successfully';
          this.loadFeedback();
        },
        error: (error) => this.errorMessage = error.error || 'Delete failed'
      });
    }
  }

 
}
