import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { CommentService } from '../../services/comment.service';
import { MarcasService, Marca } from '../../services/marcas.service'; // Importa tu servicio de marcas
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import { ProductComment } from '../../interfaces/productcomment';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly storeService = inject(StoreService);
  private readonly commentService = inject(CommentService);
  private readonly marcasService = inject(MarcasService);

  public readonly product = signal<Product | undefined>(undefined);
  public readonly store = signal<Store | undefined>(undefined);
  public readonly comments = signal<ProductComment[]>([]);
  public readonly marcas = signal<Marca[]>([]);
  public newCommentText = '';

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!productId) return;

    this.loadMarcas();
    this.loadProduct(productId);
    this.loadComments(productId);
  }

  private loadMarcas(): void {
    this.marcasService.getMarcas().subscribe({
      next: (data) => this.marcas.set(data),
      error: (err) => console.error('Error loading brands:', err),
    });
  }

  private loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.product.set(product);

        // Obtener la tienda para mostrar su logo
        if (product.tienda_id) {
          this.storeService.getStore(product.tienda_id).subscribe({
            next: (store: Store) => this.store.set(store),
            error: (err: any) => console.error('Error fetching store logo:', err),
          });
        }
      },
      error: (err: any) => console.error('Error fetching product data:', err),
    });
  }

  private loadComments(productId: number): void {
    this.commentService.getCommentsByProduct(productId).subscribe({
      next: (data: ProductComment[]) => this.comments.set(data),
      error: (err: any) => console.error('Error loading comments:', err),
    });
  }

  public addComment(): void {
    const productId = this.product()?.id;
    const text = this.newCommentText.trim();
    if (!productId || !text) return;

    const newComment: Partial<ProductComment> = { product_id: productId, text };

    this.commentService.addComment(newComment).subscribe({
      next: (saved: ProductComment) => {
        this.comments.update((prev) => [...prev, saved]);
        this.newCommentText = '';
      },
      error: (err: any) => console.error('Error adding comment:', err),
    });
  }

  public brandName(id: number | undefined): string {
    return this.marcas().find((m) => m.id === id)?.nombre || 'Marca desconocida';
  }
}
