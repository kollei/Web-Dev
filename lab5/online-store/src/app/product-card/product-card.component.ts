import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">

      <a [href]="product.link" target="_blank">
        <img [src]="selectedImage" class="main-img" />
      </a>

      <div>
        @for (img of product.images; track img) {
          <img [src]="img" class="thumb" (click)="selectedImage = img" />
        }
      </div>

      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>

      <p><b>{{ product.price | number }} ₸</b></p>

      <div class="rating-section">
        <span class="stars">
          @for (star of getStars(); track $index) {
            <span [class.filled]="star">★</span>
          }
        </span>
        <span class="rating-value">{{ product.rating }}/5</span>
      </div>

      <p>❤️ {{ product.likes }}</p>

      <div>
        <button (click)="like()">Like</button>
        <button (click)="onDelete()">Delete</button>
        <button (click)="shareTelegram()">Telegram</button>
        <button (click)="shareWhatsApp()">WhatsApp</button>
      </div>

    </div>
  `,
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() delete = new EventEmitter<number>();

  selectedImage = '';

  ngOnInit() {
    this.selectedImage = this.product.image;
  }

  like() {
    this.product.likes++;
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }

  shareWhatsApp() {
    const text = `Check out this product: ${this.product.link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  shareTelegram() {
    const url =
      `https://t.me/share/url?url=${encodeURIComponent(this.product.link)}&text=${encodeURIComponent(this.product.name)}`;
    window.open(url, '_blank');
  }

  getStars(): boolean[] {
    const rating = this.product.rating;
    const stars: boolean[] = [];
    for (let i = 0; i < 5; i++) stars.push(i < Math.round(rating));
    return stars;
  }
}