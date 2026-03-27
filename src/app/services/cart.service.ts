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

  decrementQuantity(item: CartItem) {

    item.quantity--;
    if (item.quantity === 0) {
      this.remove(item);
    } else {
      this.cartItems.set([...this.cartItems()]);
    }
  }

  incrementQuantity(item: CartItem) {

    item.quantity++;
    this.cartItems.set([...this.cartItems()]);
  }

  public remove(cartItem: CartItem) {

    const updatedCartItems = this.cartItems().filter(item => item.id !== cartItem.id);

    this.cartItems.set(updatedCartItems);
  }
}
