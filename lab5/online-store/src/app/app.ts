import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list/product-list.component';
import { CATEGORIES, PRODUCTS } from './data/products';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './app.html',
  styles: [`
    .cats { display:flex; gap:10px; flex-wrap:wrap; margin: 10px 0 20px; }
    .cat { padding:8px 12px; border:1px solid #ccc; background:#fff; border-radius:8px; cursor:pointer; }
    .cat.active { border-color:#000; font-weight:700; }
    .hint { color:#666; }
  `],
})
export class App {
  categories = CATEGORIES;
  products: Product[] = PRODUCTS;

  selectedCategoryId: number | null = null;

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  get filteredProducts() {
    return this.products.filter(p => p.categoryId === this.selectedCategoryId);
  }
}