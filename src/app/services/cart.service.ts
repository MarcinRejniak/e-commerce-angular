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

//   addToCart(cartItem: CartItem) {
//
//     let alreadyExists: boolean = false;
//     let existingCartItem: CartItem = undefined;
//
//     if (this.cartItems.length > 0) {
//
//       for (let item of this.cartItems) {
//         if (item.id === cartItem.id) {
//           existingCartItem = item;
//           break;
//         }
//       }
//
//       alreadyExists = (existingCartItem != undefined);
//     }
//
//     if (alreadyExists) {
//       existingCartItem.quantity++;
//     } else {
//       this.cartItems.push(cartItem);
//     }
//
//     this.computeCartTotals();
//   }
//
//   private computeCartTotals() {
//
//     let totalPriceValue : number = 0;
//     let totalQuantityValue : number = 0;
//
//     for (let item of this.cartItems) {
//       totalPriceValue += item.unitPrice * item.quantity;
//       totalQuantityValue += item.quantity;
//     }
//
//     this.totalPrice.next(totalPriceValue);
//     this.totalQuantity.next(totalQuantityValue);
//   }
// }
