import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorNifEnderecosComponent } from './fornecedor-nif-enderecos.component';

describe('FornecedorNifEnderecosComponent', () => {
  let component: FornecedorNifEnderecosComponent;
  let fixture: ComponentFixture<FornecedorNifEnderecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorNifEnderecosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorNifEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
