import {Component, inject, OnInit, signal} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  product = signal<Product | undefined>(undefined);

  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.handleProductDetails();
      }
    )
  }

  private handleProductDetails() {

    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product.set(data);
      })
  }

  addToCart() {

    const cartItem = new CartItem(this.product()!);

    this.cartService.addToCart(cartItem);
  }
}
