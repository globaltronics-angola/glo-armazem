import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesComponent } from './data-tables.component';
//@ts-ignore
describe('DataTablesComponent', () => {
  let component: DataTablesComponent;
  let fixture: ComponentFixture<DataTablesComponent>;
//@ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
//@ts-ignore
  it('should create', () => {
    //@ts-ignore
    expect(component).toBeTruthy();
  });
});
