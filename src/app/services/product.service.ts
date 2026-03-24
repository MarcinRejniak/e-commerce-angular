import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../common/product';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly baseUrl = "http://localhost:8081/api/products";
  private readonly categoryUrl = "http://localhost:8081/api/product-categories"
  private readonly httpClient = inject(HttpClient);

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/getByCategory?categoryId=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl)
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/getByName?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response.content)
    );
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
