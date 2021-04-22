import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSecondTemplateComponent } from './about-second-template.component';

describe('AboutSecondTemplateComponent', () => {
  let component: AboutSecondTemplateComponent;
  let fixture: ComponentFixture<AboutSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
