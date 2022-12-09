import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableFornecedoresComponent } from './datatable-fornecedores.component';

describe('DatatableFornecedoresComponent', () => {
  let component: DatatableFornecedoresComponent;
  let fixture: ComponentFixture<DatatableFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableFornecedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
