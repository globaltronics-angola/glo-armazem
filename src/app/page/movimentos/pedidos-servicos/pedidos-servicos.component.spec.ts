import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosServicosComponent } from './pedidos-servicos.component';

describe('PedidosServicosComponent', () => {
  let component: PedidosServicosComponent;
  let fixture: ComponentFixture<PedidosServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosServicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
