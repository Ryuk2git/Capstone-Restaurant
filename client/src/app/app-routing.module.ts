import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenuItemComponent } from './component/menu-item/menu-item.component';
import { OrderComponent } from './component/order/order.component';
import { RestaurantComponent } from './component/restaurant/restaurant.component';
import { AuthGuard } from './auth.guard';
import { AssignmanagerComponent } from './component/assignmanager/assignmanager.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { CustomerdetailsComponent } from './component/customerdetails/customerdetails.component';
import { Role } from './model/user';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'restaurants', component: RestaurantComponent, canActivate: [AuthGuard] },
  { path: 'restaurants/:restaurantId/menu-items', component: MenuItemComponent, canActivate: [AuthGuard] },
  { path: 'menu-items', component: MenuItemComponent, canActivate: [AuthGuard] },

  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN, Role.MANAGER, Role.CUSTOMER] } },
  { path: 'orders/:orderId', component: OrderComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN, Role.MANAGER, Role.CUSTOMER] } },

  { path: 'assign-manager', component: AssignmanagerComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN, Role.MANAGER] } },
  { path: 'customer-details', component: CustomerdetailsComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN, Role.MANAGER] } },

  // Fallback
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
