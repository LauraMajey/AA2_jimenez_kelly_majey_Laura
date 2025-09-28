export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  tienda_id: number;
  marca_id?: number;
  type: string;
  release_date: string;
  image_url: string | null;
  link: string;
}