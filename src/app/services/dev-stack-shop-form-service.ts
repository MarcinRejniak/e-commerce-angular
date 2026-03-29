import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Country} from '../common/country';
import {State} from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class DevStackShopFormService {

  private readonly baseUrl = "http://localhost:8081/api";
  private readonly httpClient = inject(HttpClient);

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {

    const searchUrl = `${this.baseUrl}/countries`;

    return this.httpClient.get<Country[]>(searchUrl);
  }

  getStates(slug: string): Observable<State[]> {

    const searchUrl = `${this.baseUrl}/states?country=${slug}`;

    return this.httpClient.get<State[]>(searchUrl);
  }
}
