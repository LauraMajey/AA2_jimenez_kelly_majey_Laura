import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, RouterLink, CurrencyPipe, TuiButton],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export default class ProductsComponent implements OnInit {
  
  #productService = inject(ProductService);

  public allProducts = signal<Product[]>([]);
  public filteredProducts = signal<Product[]>([]);
  public searchTerm = '';
  public selectedType = '';
  public selectedBrand = '';
  public brands: string[] = [];
  public types: string[] = [];

  constructor() {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.#productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts.set(data);
        this.brands = [...new Set(data.map(p => p.brand))].sort();
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

    // The filter now correctly uses the English property names:
    const result = this.allProducts().filter(p =>
      (!type || p.type?.toLowerCase() === type) &&
      (!brand || p.brand?.toLowerCase() === brand) &&
      (p.name?.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term) || p.brand?.toLowerCase().includes(term))
    );

    result.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    this.filteredProducts.set(result);
  }
}