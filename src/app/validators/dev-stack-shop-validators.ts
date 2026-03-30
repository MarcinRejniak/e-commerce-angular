import {FormControl, ValidationErrors} from '@angular/forms';

export class DevStackShopValidators {

  static notOnlyWhitespace(control: FormControl): ValidationErrors | null{

    if (control.value?.trim().length === 0) {
      return {'notOnlyWhitespace' : true};
    } else {
      return null;
    }
  }
}
