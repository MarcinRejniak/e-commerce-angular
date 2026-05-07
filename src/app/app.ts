import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ProductCategoryMenu} from './components/product-category-menu/product-category-menu';
import {Search} from './components/search/search';
import {CartStatus} from './components/cart-status/cart-status';
import {AuthService} from '@auth0/auth0-angular';
import {CommonModule} from '@angular/common';
import {Login} from './components/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCategoryMenu, Search, CartStatus, RouterLink, CommonModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-ecommerce');
  protected readonly window = window;
  protected auth = inject(AuthService);
}
