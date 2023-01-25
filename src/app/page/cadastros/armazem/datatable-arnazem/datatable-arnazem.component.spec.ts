import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableArnazemComponent } from './datatable-arnazem.component';

describe('DatatableArnazemComponent', () => {
  let component: DatatableArnazemComponent;
  let fixture: ComponentFixture<DatatableArnazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableArnazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableArnazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
