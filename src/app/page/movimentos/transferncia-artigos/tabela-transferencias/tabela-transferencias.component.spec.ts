import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTransferenciasComponent } from './tabela-transferencias.component';

describe('TabelaTransferenciasComponent', () => {
  let component: TabelaTransferenciasComponent;
  let fixture: ComponentFixture<TabelaTransferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaTransferenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaTransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
