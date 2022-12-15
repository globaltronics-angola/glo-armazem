import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablePedidosEmCursoComponent } from './datatable-pedidos-em-curso.component';

describe('DatatablePedidosEmCursoComponent', () => {
  let component: DatatablePedidosEmCursoComponent;
  let fixture: ComponentFixture<DatatablePedidosEmCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatablePedidosEmCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatablePedidosEmCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
