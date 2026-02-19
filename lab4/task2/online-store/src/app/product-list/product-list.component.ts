import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PRODUCTS } from '../data/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="page">
      <h1>Online Store</h1>
      <p class="sub">10+ products from Kaspi.kz</p>

      <div class="grid">
        @for (p of products; track p.id) {
          <app-product-card [product]="p"></app-product-card>
        }
      </div>
    </div>
  `,
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products = PRODUCTS;
}
