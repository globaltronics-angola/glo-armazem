import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAndExpComponent } from './import-and-exp.component';

describe('ImportAndExpComponent', () => {
  let component: ImportAndExpComponent;
  let fixture: ComponentFixture<ImportAndExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportAndExpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportAndExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
