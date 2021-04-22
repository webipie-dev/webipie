import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAllSecondTemplateComponent } from './products-all-second-template.component';

describe('ProductsAllSecondTemplateComponent', () => {
  let component: ProductsAllSecondTemplateComponent;
  let fixture: ComponentFixture<ProductsAllSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsAllSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAllSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
