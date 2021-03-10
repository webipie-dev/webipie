import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSectionSecondTemplateComponent } from './products-section-second-template.component';

describe('ProductsSectionSecondTemplateComponent', () => {
  let component: ProductsSectionSecondTemplateComponent;
  let fixture: ComponentFixture<ProductsSectionSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSectionSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSectionSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
