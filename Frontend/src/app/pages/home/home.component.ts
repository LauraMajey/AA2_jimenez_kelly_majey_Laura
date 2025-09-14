import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TuiButton, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {
  #productService = inject(ProductService);

  public allProducts: Product[] = [];
  public filteredProducts: Product[] = [];

  public searchTerm = '';
  public selectedType = '';
  public selectedBrand = '';
  public brands: string[] = [];
  public types: string[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.allProducts = this.#productService.getProducts();
    this.brands = [...new Set(this.allProducts.map(p => p.brand))].sort();
    this.types = [...new Set(this.allProducts.map(p => p.type))].sort();
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    const type = this.selectedType.trim().toLowerCase();
    const brand = this.selectedBrand.trim().toLowerCase();

    const hasFilters = term || type || brand;

    let result = this.allProducts
      .filter(p =>
        (!type || p.type.toLowerCase() === type) &&
        (!brand || p.brand.toLowerCase() === brand) &&
        (p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term))
      )
      .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    this.filteredProducts = hasFilters ? result : result.slice(0, 5);
  }
}
