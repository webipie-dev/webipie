import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHeaderComponent } from './change-header.component';

describe('ChangeHeaderComponent', () => {
  let component: ChangeHeaderComponent;
  let fixture: ComponentFixture<ChangeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
