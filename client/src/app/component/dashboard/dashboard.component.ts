import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector:'app-dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser=this.authService.getCurrentUser();

  restaurants:Restaurant[]=[];
  orders:Order[]=[];
  menuItems:MenuItem[]=[];
  feedbacks:Feedback[]=[];

  isScrolled=false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private restaurantService:RestaurantService,
    private orderService:OrderService,
    private menuItemService:MenuItemService,
    private feedbackService:FeedbackService
  ){}

  ngOnInit():void{

    this.loadRestaurants();
    this.loadOrders();
    this.loadMenuItems();
    this.loadFeedbacks();

  }

  loadRestaurants():void{

    this.restaurantService
      .getAllRestaurants()
      .subscribe({

        next:(data)=>{
          this.restaurants=data;
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

  loadOrders():void{

    this.orderService
      .getAllOrders()
      .subscribe({

        next:(data)=>{
          this.orders=data;
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

  loadMenuItems():void{

    this.menuItemService
      .getAllMenuItems()
      .subscribe({

        next:(data)=>{
          this.menuItems=data;
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

  loadFeedbacks():void{

    this.feedbackService
      .getAllFeedback()
      .subscribe({

        next:(data: Feedback[])=>{
          this.feedbacks=data;
        },

        error:(err: any)=>{
          console.error(err);
        }

      });

  }

  addRestaurant():void{
    console.log('Add restaurant');
  }

  editRestaurant(id:number):void{
    console.log('Edit restaurant',id);
  }

  deleteRestaurant(id:number):void{

    this.restaurantService
      .deleteRestaurant(id)
      .subscribe({

        next:()=>{
          this.loadRestaurants();
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

  deleteMenuItem(id:number):void{

    this.menuItemService
      .deleteMenuItem(id)
      .subscribe({

        next:()=>{
          this.loadMenuItems();
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

  deleteFeedback(id:number):void{

    this.feedbackService
      .deleteFeedback(id)
      .subscribe({

        next:()=>{
          this.loadFeedbacks();
        },

        error:(err: any)=>{
          console.error(err);
        }

      });

  }

  deleteOrder(id:number):void{

    this.orderService
      .deleteOrder(id)
      .subscribe({

        next:()=>{
          this.loadOrders();
        },

        error:(err)=>{
          console.error(err);
        }

      });

  }

  isAdmin():boolean{
    return this.authService.hasRole(Role.ADMIN);
  }

  isManager():boolean{
    return this.authService.hasRole(Role.MANAGER);
  }

  isCustomer():boolean{
    return this.authService.hasRole(Role.CUSTOMER);
  }

  logout():void{
    this.authService.logout();
  }

  goHome():void{
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll')
  onWindowScroll():void{
    this.isScrolled=window.scrollY>30;
  }

}