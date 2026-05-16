import { Restaurant } from './restaurant';

export interface MenuItem{

  id:number;

  name:string;

  description:string;

  price:number;

  category:string;

  available:boolean;

  restaurant:Restaurant;

}