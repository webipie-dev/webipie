import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSecondTemplateComponent } from './cart-second-template.component';

describe('CartSecondTemplateComponent', () => {
  let component: CartSecondTemplateComponent;
  let fixture: ComponentFixture<CartSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
