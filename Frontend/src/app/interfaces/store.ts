import { Product } from './product';
export interface Store {
  id: number;
  name: string;
  description: string;
  image: string;
  phone: string;
  address: string;
  category: number;
  score: number;
  likes: number;
  products?: Product[];
}