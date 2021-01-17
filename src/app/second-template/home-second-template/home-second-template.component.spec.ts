import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecondTemplateComponent } from './home-second-template.component';

describe('HomeSecondTemplateComponent', () => {
  let component: HomeSecondTemplateComponent;
  let fixture: ComponentFixture<HomeSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
