import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBusinessComponent } from './start-business.component';

describe('StartBusinessComponent', () => {
  let component: StartBusinessComponent;
  let fixture: ComponentFixture<StartBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
