import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../../../modules/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  product: Product = {
    img:`https://picsum.photos/640/640?r=${Math.random()}`,
    price: 100,
    title: 'Product 1',
  }

  addToCart(product: Product){
    console.log(product)
  }

}
