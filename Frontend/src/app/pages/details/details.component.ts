import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Product } from '../../interfaces/product';
import { Store } from '../../interfaces/store';
import { TuiButton } from '@taiga-ui/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

// New interface for comments
interface Comment {
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TuiButton, CurrencyPipe, RouterModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export default class DetailsComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #productService = inject(ProductService);
  #storeService = inject(StoreService);

  protected itemId!: number;
  protected product!: Product;
  protected store!: Store;
  protected productList = signal<Product[]>([]);

  // Properties for comments
  protected newCommentText: string = '';
  protected comments = signal<Comment[]>([]);

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(params => {
      this.itemId = Number(params['id']);
      this.loadProduct();
    });
  }

  private loadProduct(): void {
    this.product = this.#productService.getProducts().find(p => p.id === this.itemId)!;
    this.store = this.#storeService.getStore(this.product.idStore);

    this.productList.set(
      this.#productService
        .getProducts()
        .filter(p => p.id !== this.itemId)
    );
  }

  // New method to add a comment
  addComment(): void {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        text: this.newCommentText,
        timestamp: new Date()
      };
      this.comments.update(currentComments => [...currentComments, newComment]);
      this.newCommentText = ''; // Clear the input field
    }
  }

  getScore = (score: number) => this.#storeService.getScore(score);
}