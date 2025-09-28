import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marca {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class MarcasService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/marcas';

  // Obtener todas las marcas
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseUrl);
  }

  // Obtener marca por ID
  getMarca(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.baseUrl}/${id}`);
  }

  // Crear una nueva marca (esto es lo que faltaba)
  addMarca(marca: { nombre: string }): Observable<Marca> {
    return this.http.post<Marca>(this.baseUrl, marca);
  }

  // Actualizar marca
  updateMarca(id: number, nombre: string): Observable<Marca> {
    return this.http.put<Marca>(`${this.baseUrl}/${id}`, { nombre });
  }

  // Eliminar marca
  deleteMarca(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
