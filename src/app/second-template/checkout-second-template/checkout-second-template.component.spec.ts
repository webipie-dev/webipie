import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSecondTemplateComponent } from './checkout-second-template.component';

describe('CheckoutSecondTemplateComponent', () => {
  let component: CheckoutSecondTemplateComponent;
  let fixture: ComponentFixture<CheckoutSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
