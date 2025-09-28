import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { MarcasService, Marca } from '../../services/marcas.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    TuiButton,
    RouterModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  #productService = inject(ProductService);
  #marcasService = inject(MarcasService);

  public allProducts = signal<Product[]>([]);
  public filteredProducts = signal<Product[]>([]);
  public marcas = signal<Marca[]>([]);

  public searchTerm = '';
  public selectedType = '';
  public selectedBrand = '';
  public brands: string[] = [];
  public types: string[] = [];

  ngOnInit() {
    this.loadMarcas();
    this.loadProducts();
  }

  loadMarcas() {
    this.#marcasService.getMarcas().subscribe({
      next: (data) => this.marcas.set(data),
      error: (err) => console.error('Error loading marcas:', err),
    });
  }

  loadProducts() {
    this.#productService.getProducts().subscribe({
      next: (data) => {
        const safeData = Array.isArray(data) ? data : [];
        this.allProducts.set(safeData);

        // Obtener lista única de marcas usando marca_id
        this.brands = [...new Set(
          safeData.map(p => this.marcas().find(m => m.id === p.marca_id)?.nombre)
        )].filter(Boolean) as string[];

        // Lista de tipos
        this.types = [...new Set(safeData.map(p => p.type))].sort();

        this.applyFilters();
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    const type = this.selectedType.trim().toLowerCase();
    const brand = this.selectedBrand.trim().toLowerCase();

    const result = this.allProducts().filter((p) => {
      const brandName = this.marcas().find(m => m.id === p.marca_id)?.nombre?.toLowerCase() ?? '';

      return (
        (!type || p.type?.toLowerCase() === type) &&
        (!brand || brandName === brand) &&
        (p.name?.toLowerCase().includes(term) ||
         brandName.includes(term) ||
         p.description?.toLowerCase().includes(term))
      );
    });

    // Ordenar por fecha de lanzamiento (más reciente primero)
    result.sort((a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );

    // Si no hay filtros, mostrar solo los primeros 5 productos
    this.filteredProducts.set(term || type || brand ? result : result.slice(0, 5));
  }

  public brandName(id: number | undefined): string {
    return this.marcas().find((m) => m.id === id)?.nombre || 'Marca desconocida';
  }
}
