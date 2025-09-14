import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TuiButton, RouterModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {
  
  #productService = inject(ProductService);

  public allProducts = signal<Product[]>([]);
  public filteredProducts = signal<Product[]>([]);

  public searchTerm = '';
  public selectedType = '';
  public selectedBrand = '';
  public brands: string[] = [];
  public types: string[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.#productService.getProducts().subscribe({
      next: (data) => {
        // Asegura que data sea un array antes de establecer la señal
        this.allProducts.set(Array.isArray(data) ? data : []);
        // Mapea los datos de forma segura para construir las opciones de filtro
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

    // Usa el operador ?. (encadenamiento opcional) para prevenir errores
    const result = this.allProducts().filter(p =>
      (!type || p.type?.toLowerCase() === type) &&
      (!brand || p.brand?.toLowerCase() === brand) &&
      (p.name?.toLowerCase().includes(term) || p.brand?.toLowerCase().includes(term))
    );

    result.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    const hasFilters = term || type || brand;
    this.filteredProducts.set(hasFilters ? result : result.slice(0, 5));
  }
}