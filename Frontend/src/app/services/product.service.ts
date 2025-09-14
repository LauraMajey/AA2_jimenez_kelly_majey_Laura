import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { Store } from '../interfaces/store';

@Injectable({ providedIn: 'root' })
export class ProductService {
  #http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/productos';

 
  getProducts(): Observable<Product[]> {
    return this.#http.get<Product[]>(this.apiUrl);
  }

 
  getProduct(id: number): Observable<Product> {
    return this.#http.get<Product>(`${this.apiUrl}/${id}`);
  }

 
  getProductStore(id: number): Observable<Store> {
    return this.#http.get<Store>(`${this.apiUrl}/${id}/tienda`);
  }

 
  getProductsByStore(storeId: number): Observable<Product[]> {
    return this.#http.get<Product[]>(`${this.apiUrl}/store/${storeId}`);
  }

 
  addProduct(product: Product): Observable<any> {
    return this.#http.post(this.apiUrl, product);
  }


  uploadProduct(formData: FormData): Observable<any> {
    return this.#http.post(this.apiUrl, formData);
  }

  
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.#http.put(`${this.apiUrl}/${id}`, formData);
  }

 
  deleteProduct(id: number): Observable<any> {
    return this.#http.delete(`${this.apiUrl}/${id}`);
  }
}
