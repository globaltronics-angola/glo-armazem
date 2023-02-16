import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonImportAndExpComponent } from './json-import-and-exp.component';

describe('JsonImportAndExpComponent', () => {
  let component: JsonImportAndExpComponent;
  let fixture: ComponentFixture<JsonImportAndExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonImportAndExpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonImportAndExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
