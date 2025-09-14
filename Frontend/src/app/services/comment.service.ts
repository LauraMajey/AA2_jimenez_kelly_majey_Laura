import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductComment } from '../interfaces/productcomment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiUrl = 'http://localhost:3000/api/comments'; // Ajusta según tu entorno

  constructor(private http: HttpClient) {}

  getCommentsByProduct(productId: number): Observable<ProductComment[]> {
    return this.http.get<ProductComment[]>(`${this.apiUrl}/product/${productId}`);
  }

  addComment(comment: Partial<ProductComment>): Observable<ProductComment> {
    return this.http.post<ProductComment>(this.apiUrl, comment);
  }
}
