export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  type: string;
  release_date: string; // YYYY-MM-DD
  tienda_id?: number;
  image_url?: string;
  link?: string;
}
