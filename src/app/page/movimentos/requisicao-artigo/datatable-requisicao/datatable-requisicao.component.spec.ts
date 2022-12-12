import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableRequisicaoComponent } from './datatable-requisicao.component';

describe('DatatableRequisicaoComponent', () => {
  let component: DatatableRequisicaoComponent;
  let fixture: ComponentFixture<DatatableRequisicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableRequisicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
