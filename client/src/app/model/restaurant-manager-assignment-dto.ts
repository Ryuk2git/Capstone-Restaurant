import { Restaurant } from './restaurant';
import { User } from './user';

export interface RestaurantManagerAssignmentDTO{

  id:number;

  restaurant:Restaurant;

  manager:User;

}