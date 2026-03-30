import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {DevStackShopFormService} from '../../services/dev-stack-shop-form-service';
import {Country} from '../../common/country';
import {State} from '../../common/state';
import {DevStackShopValidators} from '../../validators/dev-stack-shop-validators';

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
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          DevStackShopValidators.notOnlyWhitespace
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          DevStackShopValidators.notOnlyWhitespace
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]),
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

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName') as FormControl;
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName') as FormControl;
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email') as FormControl;
  }

  copyShippingAddressToBillingAddress(event: Event) {

    const isChecked = (event.target as HTMLInputElement).checked;
    const billingGroup = this.checkoutFormGroup.get('billingAddress');

    if (isChecked) {

      this.billingAddressStates.set(this.shippingAddressStates());

      const shippingAddress = this.checkoutFormGroup.get('shippingAddress')?.value;
      billingGroup?.setValue(shippingAddress);

      billingGroup?.disable();
    } else {
      billingGroup?.enable();
      billingGroup?.reset();
      this.billingAddressStates.set([]);
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

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countrySlug = formGroup?.value?.country;

    if (countrySlug) {
      this.devStackShopFormService.getStates(countrySlug).subscribe(
        data => {
          if (formGroupName === 'shippingAddress') {
            this.shippingAddressStates.set(data);
          } else {
            this.billingAddressStates.set(data);
          }
        }
      )
    }

  }
}
