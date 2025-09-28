import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/productos'; // URL del backend Express

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los productos
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Obtener un producto por su ID
   */
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear producto (con o sin imagen)
   */
  uploadProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  /**
   * Actualizar producto por ID
   */
  updateProduct(id: number, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productData);
  }

  /**
   * Eliminar producto por ID
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Subir imagen del producto (si lo manejas aparte en tu backend)
   */
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>('http://localhost:3000/upload', formData);
  }
}
