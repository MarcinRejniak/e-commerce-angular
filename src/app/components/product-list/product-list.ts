import {Component, inject, signal, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink, NgOptimizedImage, NgbPagination],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  products =  signal<Product[]>([]);
  currentCategoryId = signal<number>(1);
  previousCategoryId = signal<number>(1);
  currentCategoryName = signal<string>("");
  searchMode = signal<boolean>(false);

  pageNumber = signal<number>(1);
  pageSize = signal<number>(5);
  totalElements = signal<number>(0);

  previousKeyword = signal<string>("");

  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode.set(this.route.snapshot.paramMap.has('keyword'));

    if (this.searchMode()) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword() !== theKeyword) {
      this.pageNumber.set(1);
    }

    this.previousKeyword.set(theKeyword);

    this.productService.searchProductsPaginate(this.pageNumber() - 1,
                                                this.pageSize(),
                                                theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      this.currentCategoryId.set(+this.route.snapshot.paramMap.get('id')!);
      this.currentCategoryName.set(this.route.snapshot.paramMap.get('name')!);
    } else {
      this.currentCategoryId.set(0);
      this.currentCategoryName.set('All Products');
    }

    if (this.previousCategoryId() !== this.currentCategoryId()) {
      this.pageNumber.set(1);
    }

    this.previousCategoryId.set(this.currentCategoryId());

    if (this.currentCategoryId() > 0) {
      this.productService.getProductListPaginate(this.pageNumber() - 1,
        this.pageSize(),
        this.currentCategoryId())
        .subscribe(this.processResult())
    } else {
      this.productService.getAllProductsPaginate(this.pageNumber() - 1,
        this.pageSize())
        .subscribe(this.processResult()
        )
    }
  }

  updatePageSize(pageSize: string) {
    this.pageSize.set(+pageSize);
    this.pageNumber.set(1);
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products.set(data.content);
      this.pageNumber.set(data.number + 1);
      this.pageSize.set(data.size);
      this.totalElements.set(data.totalElements);
    };
  }
}
