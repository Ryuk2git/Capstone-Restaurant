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
   //Write your logic here

}
