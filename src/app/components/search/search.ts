import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  private readonly router = inject(Router);

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`)
  }
}
