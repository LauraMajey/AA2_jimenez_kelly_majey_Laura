import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
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
  #productService = inject(ProductService);
  #storeService = inject(StoreService);
  #route = inject(ActivatedRoute);
  #router = inject(Router); // Inject the Router service

  products = signal<Product[]>([]);
  stores = signal<Store[]>([]);
  brands = signal<string[]>([]);
  
  filteredProducts = signal<Product[]>([]);

  selectedStore: string = '';
  selectedBrand: string = '';

  ngOnInit(): void {
    this.products.set(this.#productService.getProducts());
    this.stores.set(this.#storeService.getStores());
    this.brands.set([...new Set(this.products().map(p => p.brand))]);

    this.#route.queryParams.subscribe(params => {
      this.selectedStore = params['storeId'] || '';
      this.selectedBrand = params['brand'] || '';
      this.filterProducts();
    });
  }
  
  private filterProducts(): void {
    const filtered = this.products().filter(p => {
      const byStore = this.selectedStore ? p.idStore === +this.selectedStore : true;
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