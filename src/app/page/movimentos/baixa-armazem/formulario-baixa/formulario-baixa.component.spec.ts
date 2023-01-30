import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioBaixaComponent } from './formulario-baixa.component';

describe('FormularioBaixaComponent', () => {
  let component: FormularioBaixaComponent;
  let fixture: ComponentFixture<FormularioBaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioBaixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioBaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
