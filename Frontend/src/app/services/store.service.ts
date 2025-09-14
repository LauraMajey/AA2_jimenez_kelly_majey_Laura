import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/store';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private apiUrl = 'http://localhost:3000/api/tiendas';

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }

  addStore(store: Store): Observable<any> {
    return this.http.post(this.apiUrl, store);
  }

  updateStore(id: number, store: Store): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, store);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getScore(score: number): string {
    if (score >= 4.5) return 'Excelente';
    if (score >= 3.5) return 'Bueno';
    return 'Regular';
  }
}
