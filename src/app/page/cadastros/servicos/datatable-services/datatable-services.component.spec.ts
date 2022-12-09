import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableServicesComponent } from './datatable-services.component';

describe('DatatableServicesComponent', () => {
  let component: DatatableServicesComponent;
  let fixture: ComponentFixture<DatatableServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
