import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaOcorrenciasComponent } from './tabela-ocorrencias.component';

describe('TabelaOcorrenciasComponent', () => {
  let component: TabelaOcorrenciasComponent;
  let fixture: ComponentFixture<TabelaOcorrenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaOcorrenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaOcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
