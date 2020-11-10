import { TestBed } from '@angular/core/testing';

import { OrderEditService } from './order-edit.service';

describe('OrderEditService', () => {
  let service: OrderEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
