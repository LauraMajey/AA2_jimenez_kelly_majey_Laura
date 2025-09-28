import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { MarcasService, Marca } from '../../services/marcas.service';
import { Store } from '../../interfaces/store';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-crud-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.scss']
})
export class CrudProductsComponent implements OnInit {
  stores: Store[] = [];
  marcas: Marca[] = [];
  product: Product | undefined;

  showNewMarca = false;
  newMarca = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private storeService = inject(StoreService);
  private marcasService = inject(MarcasService);

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (data) => this.stores = data,
      error: (err) => console.error('Error al cargar tiendas', err)
    });

    this.marcasService.getMarcas().subscribe({
      next: (data) => this.marcas = data,
      error: (err) => console.error('Error al cargar marcas', err)
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error('Error al cargar producto', err)
      });
    }
  }

  onMarcaChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.showNewMarca = select.value === 'other';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    if (this.product?.image_url) {
      formData.append('image_url', this.product.image_url);
    }

    // Si se escribió nueva marca, agregarla primero
    if (this.showNewMarca && this.newMarca.trim()) {
      this.marcasService.addMarca({ nombre: this.newMarca.trim() }).subscribe({
        next: (marca) => {
          formData.set('marca_id', String(marca.id));
          this.submitProduct(formData);
        },
        error: (err) => console.error('Error al agregar marca', err)
      });
    } else {
      this.submitProduct(formData);
    }
  }

  private submitProduct(formData: FormData): void {
    if (this.product?.id) {
      this.productService.updateProduct(this.product.id, formData).subscribe({
        next: () => {
          alert('✅ Producto actualizado');
          this.router.navigate(['/details', this.product?.id]);
        },
        error: (err) => console.error('Error al actualizar producto', err)
      });
    } else {
      this.productService.uploadProduct(formData).subscribe({
        next: () => {
          alert('✅ Producto creado');
          (document.querySelector('form') as HTMLFormElement).reset();
        },
        error: (err) => console.error('Error al crear producto', err)
      });
    }
  }
}
