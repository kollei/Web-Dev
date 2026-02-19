import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      
      <a [href]="product().link" target="_blank">
        <img [src]="selectedImage" class="main-img">
      </a>
      
      <div>
        @for (img of product().images; track img) {
          <img
          [src]="img"
          class="thumb"
          (click)="selectedImage = img"
          >
        }
      </div>
      
      <h3>{{ product().name }}</h3>
      <p>{{ product().description }}</p>
      
      <p><b>{{ product().price | number }} ₸</b></p>

      <div class="rating-section">
        <span class="stars">@for (star of getStars(); track star) {<span [class.filled]="star">★</span>}</span>
        <span class="rating-value">{{ product().rating }}/5</span>
      </div>


      
      
      <div>
        <button (click)="shareTelegram()">Telegram</button>
        <button (click)="shareWhatsApp()">WhatsApp</button>
      </div>
      
    </div>
    `,
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  selectedImage = '';
  
  ngOnInit() {
    this.selectedImage = this.product().image;
  }
  
  shareWhatsApp() {
    const p = this.product();
    const text = `Check out this product: ${p.link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
  
  shareTelegram() {
    const p = this.product();
    const url =
    `https://t.me/share/url?url=${encodeURIComponent(p.link)}&text=${encodeURIComponent(p.name)}`;
    window.open(url, '_blank');
  }
  
  filledStar = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg';
  emptyStar = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg';

  getStars(): boolean[] {
    const rating = this.product().rating;
    const stars: boolean[] = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.round(rating));
    }
    return stars;
  }
}
