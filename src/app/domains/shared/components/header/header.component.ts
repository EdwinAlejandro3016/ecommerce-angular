import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSideMenu = signal(false);

  private cartService = inject(CartService);

  myCart = this.cartService.getMyCart();
  total = this.cartService.getTotal();

  constructor(
  ){
  }

  toggleSideBar(){
    this.showSideMenu.update(prevState=> !prevState);
  }
}
