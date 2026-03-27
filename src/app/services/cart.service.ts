import {computed, Injectable, signal} from '@angular/core';
import {CartItem} from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  );

  totalQuantity = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(cartItem: CartItem) {

    const currentItems = this.cartItems();

    const existingItem = currentItems.find(item => item.id === cartItem.id)

    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.set([...currentItems])
    } else {
      this.cartItems.set([...currentItems, cartItem])
    }
  }
}
