import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '@/shared/models/product.model';
import { ProductService } from '@/shared/services/product.service';
import { CartService } from '@/shared/services/cart.service';
import { RouterLinkWithHref } from '@angular/router';
import { SelectCategoriesComponent } from '@/shared/components/select-categories/select-categories.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ProductComponent,RouterLinkWithHref,
    SelectCategoriesComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  constructor(){
    effect(()=>{
      const products = this.productService.productsByCategory();
      this.products.set(products);
    },{allowSignalWrites: true})
  }

  ngOnInit(): void {
    const products = this.productService.getProducts()
    .subscribe({
      next: res=>{
        this.products.set(res);
        this.productService.products.set(res)
      },
      error: ()=> {

      }
    });
  }

}
