import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TuiButton, RouterModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export default class StoreComponent implements OnInit {
  #storeService = inject(StoreService);
  #router = inject(Router);

  protected stores = signal<Store[]>([]);

  ngOnInit(): void {
  this.#storeService.getStores().subscribe({
    next: (data) => this.stores.set(data),
    error: (err) => console.error('Error cargando tiendas:', err)
  });
}

  getScore(score: number): string {
    return this.#storeService.getScore(score);
  }

  goToStore(id: number) {
    this.#router.navigate([`/store/${id}`]);
  }
}
