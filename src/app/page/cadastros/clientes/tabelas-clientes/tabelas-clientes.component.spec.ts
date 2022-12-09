import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasClientesComponent } from './tabelas-clientes.component';

describe('TabelasClientesComponent', () => {
  let component: TabelasClientesComponent;
  let fixture: ComponentFixture<TabelasClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelasClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelasClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
