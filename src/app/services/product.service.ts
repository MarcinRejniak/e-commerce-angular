import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly baseUrl = "http://localhost:8081/api/products";
  private readonly httpClient = inject(HttpClient);

  getProductList(theCategoryId: number): Observable<GetResponse> {

    const searchUrl = `${this.baseUrl}/search?categoryId=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl);
  }
}

  interface GetResponse {
    content: Product[];
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    }
}
