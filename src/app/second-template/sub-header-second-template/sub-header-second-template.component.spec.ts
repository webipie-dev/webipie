import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderSecondTemplateComponent } from './sub-header-second-template.component';

describe('SubHeaderSecondTemplateComponent', () => {
  let component: SubHeaderSecondTemplateComponent;
  let fixture: ComponentFixture<SubHeaderSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHeaderSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
