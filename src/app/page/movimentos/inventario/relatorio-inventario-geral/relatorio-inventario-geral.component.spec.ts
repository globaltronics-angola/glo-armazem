import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioInventarioGeralComponent } from './relatorio-inventario-geral.component';

describe('RelatorioInventarioGeralComponent', () => {
  let component: RelatorioInventarioGeralComponent;
  let fixture: ComponentFixture<RelatorioInventarioGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioInventarioGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioInventarioGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
