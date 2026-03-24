import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductCategory} from '../../common/product-category';
import {ProductService} from '../../services/product.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css',
})
export class ProductCategoryMenu implements OnInit {

  productCategories = signal<ProductCategory[]>([]);

  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories.set(data);
      }
    )
  }
}
