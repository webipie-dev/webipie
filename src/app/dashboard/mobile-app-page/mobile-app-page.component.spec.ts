import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppPageComponent } from './mobile-app-page.component';

describe('MobileAppPageComponent', () => {
  let component: MobileAppPageComponent;
  let fixture: ComponentFixture<MobileAppPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAppPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
