import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterGridFilterComponent } from './outer-grid-filter.component';

describe('OuterGridFilterComponent', () => {
  let component: OuterGridFilterComponent;
  let fixture: ComponentFixture<OuterGridFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterGridFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
