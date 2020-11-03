import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeContactComponent } from './change-contact.component';

describe('ChangeContactComponent', () => {
  let component: ChangeContactComponent;
  let fixture: ComponentFixture<ChangeContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
