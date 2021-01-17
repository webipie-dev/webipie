import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecondTemplateComponent } from './header-second-template.component';

describe('HeaderSecondTemplateComponent', () => {
  let component: HeaderSecondTemplateComponent;
  let fixture: ComponentFixture<HeaderSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
