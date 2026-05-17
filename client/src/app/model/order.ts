import { Restaurant } from './restaurant';
import { User } from './user';

export interface Order {
  id: number;
  customerName: string;
  orderTime: string;
  status: string;
  totalAmount: number;
  restaurant?: Restaurant;
  user?: User;
}