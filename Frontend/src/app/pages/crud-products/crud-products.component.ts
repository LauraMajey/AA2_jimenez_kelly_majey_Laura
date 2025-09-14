import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';

@Component({
  selector: 'app-crud-products',
  imports: [CommonModule],
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.scss']
})
export class CrudProductsComponent {
  stores: Store[] = [];

  constructor(
    private productService: ProductService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (data) => this.stores = data,
      error: (err) => console.error('Error al cargar tiendas', err)
    });
  }

  onSubmit(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  this.productService.uploadProduct(formData).subscribe({
    next: () => {
      alert('✅ Producto creado exitosamente');
      form.reset(); 
    },
    error: err => console.error('Error al crear producto', err)
  });
}
}
