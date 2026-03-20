import {Component, inject, signal, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);

  products =  signal<Product[]>([]);

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products.set(data)
      });
  }
}
