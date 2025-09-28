import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

import { ProductService } from '../../services/product.service';
import { MarcasService, Marca } from '../../services/marcas.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    RouterLink,
    CurrencyPipe,
    TuiButton
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export default class ProductsComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {
    this.loadMarcas();
    this.loadProducts();
  }

  loadMarcas() {
    this.#marcasService.getMarcas().subscribe({
      next: (data) => this.marcas.set(data),
      error: (err) => console.error('Error al cargar marcas:', err)
    });
  }

  loadProducts() {
    this.#productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts.set(data);

        // Generar lista única de marcas y tipos
        this.brands = [...new Set(
          data.map(p => this.marcas().find(m => m.id === p.marca_id)?.nombre)
        )].filter(Boolean) as string[];

        this.types = [...new Set(data.map(p => p.type))].sort();

        this.applyFilters();
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    const type = this.selectedType.trim().toLowerCase();
    const brand = this.selectedBrand.trim().toLowerCase();

    const result = this.allProducts().filter(p => {
      const brandName = this.marcas().find(m => m.id === p.marca_id)?.nombre?.toLowerCase() ?? '';

      return (
        (!type || p.type?.toLowerCase() === type) &&
        (!brand || brandName === brand) &&
        (
          p.name?.toLowerCase().includes(term) ||
          brandName.includes(term) ||
          p.description?.toLowerCase().includes(term)
        )
      );
    });

    // Ordenar por fecha de lanzamiento (más reciente primero)
    result.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    this.filteredProducts.set(result);
  }
}
