import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioArtigosComponent } from './formulario-artigos.component';

describe('FormularioArtigosComponent', () => {
  let component: FormularioArtigosComponent;
  let fixture: ComponentFixture<FormularioArtigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioArtigosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioArtigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
