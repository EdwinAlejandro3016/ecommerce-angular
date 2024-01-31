import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../modules/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product: Product = {
    title: '',
    price: 0,
    img: '',
    id: ''
  }


  @Output() addToCart = new EventEmitter();

  addToCartHandler(){
    this.addToCart.emit(this.product)
  }
}
