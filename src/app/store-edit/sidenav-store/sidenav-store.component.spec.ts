import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavStoreComponent } from './sidenav-store.component';

describe('SidenavStoreComponent', () => {
  let component: SidenavStoreComponent;
  let fixture: ComponentFixture<SidenavStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
