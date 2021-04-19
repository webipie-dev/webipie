import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSecondTemplateComponent } from './search-second-template.component';

describe('SearchSecondTemplateComponent', () => {
  let component: SearchSecondTemplateComponent;
  let fixture: ComponentFixture<SearchSecondTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSecondTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSecondTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
