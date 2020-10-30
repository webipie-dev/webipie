import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFontComponent } from './change-font.component';

describe('ChangeFontComponent', () => {
  let component: ChangeFontComponent;
  let fixture: ComponentFixture<ChangeFontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeFontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
