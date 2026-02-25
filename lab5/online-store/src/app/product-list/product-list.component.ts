import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    @if (products.length === 0) {
      <p>No products in this category</p>
    } @else {
      <div class="grid">
        @for (p of products; track p.id) {
          <app-product-card [product]="p" (delete)="remove($event)"></app-product-card>
        }
      </div>
    }
  `,
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  remove(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}