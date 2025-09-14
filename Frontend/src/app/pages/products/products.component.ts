import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export default class ProductsComponent implements OnInit {
  // Inyecciones
  #productService = inject(ProductService);
  #storeService = inject(StoreService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  // Signals
  products = signal<Product[]>([]);
  stores = signal<Store[]>([]);
  brands = signal<string[]>([]);
  filteredProducts = signal<Product[]>([]);

  // Filtros seleccionados
  selectedStore: string = '';
  selectedBrand: string = '';

  ngOnInit(): void {
    // Cargar productos desde el backend
    this.#productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.brands.set([...new Set(data.map(p => p.brand))]);

        // Leer filtros desde query params
        this.#route.queryParams.subscribe(params => {
          this.selectedStore = params['storeId'] || '';
          this.selectedBrand = params['brand'] || '';
          this.filterProducts();
        });
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });

    // Cargar tiendas desde el backend
    this.#storeService.getStores().subscribe({
      next: (data) => {
        this.stores.set(data);
      },
      error: (err) => {
        console.error('Error cargando tiendas:', err);
      }
    });
  }

  private filterProducts(): void {
    const filtered = this.products().filter(p => {
      const byStore = this.selectedStore ? p.tienda_id  === +this.selectedStore : true;
      const byBrand = this.selectedBrand ? p.brand === this.selectedBrand : true;
      return byStore && byBrand;
    });
    this.filteredProducts.set(filtered);
  }

  applyFilters(): void {
    this.#router.navigate(
      [],
      {
        relativeTo: this.#route,
        queryParams: {
          storeId: this.selectedStore || null,
          brand: this.selectedBrand || null
        },
        queryParamsHandling: 'merge'
      }
    );
  }

  addProduct(): void {
    this.#router.navigate(['/add-product']);
  }
}
