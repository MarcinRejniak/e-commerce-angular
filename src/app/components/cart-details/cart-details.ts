import {Component, inject} from '@angular/core';
import { CartService } from '../../services/cart.service';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails {

  public readonly cartService = inject(CartService);
}
