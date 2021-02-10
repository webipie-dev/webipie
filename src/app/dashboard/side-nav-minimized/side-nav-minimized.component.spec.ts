import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavMinimizedComponent } from './side-nav-minimized.component';

describe('SideNavMinimizedComponent', () => {
  let component: SideNavMinimizedComponent;
  let fixture: ComponentFixture<SideNavMinimizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavMinimizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavMinimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
