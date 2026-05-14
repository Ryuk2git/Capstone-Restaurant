import { Restaurant } from './restaurant';
import { MenuItem } from './menu-item';
import { User } from './user';

export interface Order {
  id?:number;
  customerName:string;
  orderTime?:string;
  status?:string;
  totalAmount?:number;
  restaurant:Restaurant;
  items:MenuItem[];
  user:User;
}
