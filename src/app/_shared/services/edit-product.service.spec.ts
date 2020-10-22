import { TestBed } from '@angular/core/testing';

import { EditProductService } from './edit-product.service';

describe('EditProductService', () => {
  let service: EditProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
