import { Customer } from './customer';
import { Restaurant } from './restaurant';
import { MenuItem } from './menu-item';

export interface Order {

  orderId:number;

  quantity:number;

  totalAmount:number;

  orderStatus:string;

  orderDate:string;

  customer:Customer;

  restaurant:Restaurant;

  menuItems:MenuItem[];

}