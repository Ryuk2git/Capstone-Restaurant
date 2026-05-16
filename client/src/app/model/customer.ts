import { User } from './user';
import { Order } from './order';

export interface Customer{

  user:User;

  orders:Order[];

}