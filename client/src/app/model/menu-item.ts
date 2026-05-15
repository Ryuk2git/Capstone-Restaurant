import { Restaurant } from './restaurant';

export interface MenuItem {

  menuItemId:number;

  itemName:string;

  description:string;

  category:string;

  price:number;

  available:boolean;

  imageUrl:string;

  restaurant:Restaurant;

}