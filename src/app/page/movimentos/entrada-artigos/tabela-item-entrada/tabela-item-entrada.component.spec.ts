import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaItemEntradaComponent } from './tabela-item-entrada.component';

describe('TabelaItemEntradaComponent', () => {
  let component: TabelaItemEntradaComponent;
  let fixture: ComponentFixture<TabelaItemEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaItemEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaItemEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
