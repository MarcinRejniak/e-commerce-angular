import { TestBed } from '@angular/core/testing';

import { DevStackShopFormService } from './dev-stack-shop-form-service';

describe('DevStackShopFormService', () => {
  let service: DevStackShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevStackShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
