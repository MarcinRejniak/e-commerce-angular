import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly baseUrl = "http://localhost:8081/api/products";
  private readonly categoryUrl = "http://localhost:8081/api/product-categories"
  private readonly httpClient = inject(HttpClient);

  getProductList(theCategoryId: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search?categoryId=${theCategoryId}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl)
  }
}

  interface GetResponseProduct {
    content: Product[];
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    }
}
