import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaDevolucaoComponent } from './tabela-devolucao.component';

describe('TabelaDevolucaoComponent', () => {
  let component: TabelaDevolucaoComponent;
  let fixture: ComponentFixture<TabelaDevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaDevolucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
