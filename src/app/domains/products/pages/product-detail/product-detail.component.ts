import { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
}) 
export default class ProductDetailComponent implements OnChanges {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  private route = inject(ActivatedRoute);
  @Input() id: number = 0;

  product = signal<Product | null>(null)
  cover = signal('');

  ngOnChanges(changes: SimpleChanges): void { 
    if (changes.hasOwnProperty('id') && changes['id'].currentValue) { 
      this.productService.getProduct(changes['id'].currentValue).subscribe({
        next: product=>{
          this.product.set(product);
          if(product.images.length > 0){
            this.cover.set(product.images[0])
          }
        }
      })
    } 
  }

  changeCoverImg(index: number){
    const urlImg = this.product()?.images[index] || "";
    this.cover.set(urlImg)
  }

  addToCart(){
    const product = this.product();
    if(product){
      this.cartService.addToCart(product);
    }
  }
}
