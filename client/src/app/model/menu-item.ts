import { Restaurant } from './restaurant';

export interface MenuItem {

  id: number;

  name: string;

  description: string;

  price: number;

  menuType: string;

  quantity: number;

  available: boolean;

  restaurant: Restaurant;

}