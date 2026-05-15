import { Customer } from './customer';
import { Restaurant } from './restaurant';

export interface Feedback {

  feedbackId:number;

  comment:string;

  rating:number;

  feedbackDate:string;

  customer:Customer;

  restaurant:Restaurant;

}