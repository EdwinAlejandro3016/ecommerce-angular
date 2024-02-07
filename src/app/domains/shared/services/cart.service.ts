import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //all the products added to my cart
  private myCart = signal<Product[]>([]);
  private total = computed(()=> {
    const cart = this.myCart();
    return cart.reduce((a, c)=> a + c.price, 0);
  })

  constructor() { }

  addToCart(product: Product){
    this.myCart.update(prevState => [...prevState, product]);
  }

  getMyCart(){
    return this.myCart;
  }

  getTotal(){
    return this.total;
  }
}
