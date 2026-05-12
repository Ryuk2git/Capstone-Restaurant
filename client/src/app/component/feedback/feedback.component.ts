import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../shared/services/feedback-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
export class FeedbackComponent {

//Write your logic here
 
}
