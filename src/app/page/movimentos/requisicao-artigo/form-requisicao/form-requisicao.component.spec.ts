import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequisicaoComponent } from './form-requisicao.component';

describe('FormRequisicaoComponent', () => {
  let component: FormRequisicaoComponent;
  let fixture: ComponentFixture<FormRequisicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequisicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
