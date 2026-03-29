import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {DevStackShopFormService} from '../../services/dev-stack-shop-form-service';
import {Country} from '../../common/country';
import {State} from '../../common/state';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit{

  checkoutFormGroup!: FormGroup;

  creditCardYears = signal<number[]>([]);
  creditCardMonths = signal<number[]>([]);
  countries = signal<Country[]>([]);
  shippingAddressStates = signal<State[]>([]);
  billingAddressStates = signal<State[]>([]);

  private readonly formBuilder = inject(FormBuilder);
  public readonly cartService = inject(CartService);
  public readonly devStackShopFormService = inject(DevStackShopFormService);

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipcode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipcode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    })

    const startMonth = new Date().getMonth() + 1;

    this.devStackShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths.set(data);
      }
    )

    this.devStackShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears.set(data);
      }
    )

    this.devStackShopFormService.getCountries().subscribe(
      data => {
        this.countries.set(data);
      }
    )
  }

  onSubmit() {

  }

  copyShippingAddressToBillingAddress(event: Event) {

    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {

      const shippingAddress = this.checkoutFormGroup.get('shippingAddress')?.value;

      this.checkoutFormGroup.get('billingAddress')?.setValue(shippingAddress);
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = creditCardFormGroup?.value.expirationYear;

    let startMonth;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.devStackShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths.set(data);
      }
    )
  }

  handleStates(groupName: string) {

    const formGroup = this.checkoutFormGroup.get(groupName);
    const countrySlug = formGroup?.value?.country;

    if (countrySlug) {
      this.devStackShopFormService.getStates(countrySlug).subscribe(
        data => {
          if (groupName === 'shippingAddress') {
            this.shippingAddressStates.set(data);
          } else {
            this.billingAddressStates.set(data);
          }
        }
      )
    }

  }
}
