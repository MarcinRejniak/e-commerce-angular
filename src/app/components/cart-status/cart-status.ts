import {Component, inject} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart-status',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.css',
})
export class CartStatus {
  public cartService = inject(CartService);
}
