import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export default class DetailsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #productService = inject(ProductService);
  #storeService = inject(StoreService);

  product?: Product;
  store?: Store;
  relatedProducts: Product[] = [];

  private itemId!: number;

  ngOnInit(): void {
    // ✅ obtener id desde la URL
    this.itemId = +this.#route.snapshot.paramMap.get('id')!;

    // ✅ cargar productos desde el servicio
    this.#productService.getProducts().subscribe(products => {
      // buscar el producto actual
      this.product = products.find(p => p.id === this.itemId);

      if (this.product) {
        // ✅ cargar tienda correspondiente
        if (this.product.tienda_id) {
          this.#storeService.getStore(this.product.tienda_id).subscribe(store => {
            this.store = store;
          });
        }

        // ✅ productos relacionados (ejemplo: misma marca, diferente id)
        this.relatedProducts = products
          .filter(p => p.id !== this.itemId && p.brand === this.product?.brand)
          .slice(0, 4);
      }
    });
  }

  goBack(): void {
    this.#router.navigate(['/products']);
  }
}
