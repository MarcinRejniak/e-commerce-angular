import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit{

  checkoutFormGroup!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  public readonly cartService = inject(CartService);

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
}
