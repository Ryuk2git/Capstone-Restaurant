import { User } from './user';

export interface Restaurant {

  restaurantId:number;

  restaurantName:string;

  cuisine:string;

  city:string;

  address:string;

  contactNumber:string;

  email:string;

  openingTime:string;

  closingTime:string;

  averageRating:number;

  imageUrl:string;

  manager:User;

}