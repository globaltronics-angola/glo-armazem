import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDevolucaoComponent } from './formulario-devolucao.component';

describe('FormularioDevolucaoComponent', () => {
  let component: FormularioDevolucaoComponent;
  let fixture: ComponentFixture<FormularioDevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDevolucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
