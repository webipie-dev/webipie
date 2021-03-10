import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSecondTemplateComponent } from './footer-second-template.component';

describe('FooterSecondTemplateComponent', () => {
  let component: FooterSecondTemplateComponent;
  let fixture: ComponentFixture<FooterSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
