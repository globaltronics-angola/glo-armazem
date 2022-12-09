import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsGeralFornecedoresComponent } from './forms-geral-fornecedores.component';

describe('FormsGeralFornecedoresComponent', () => {
  let component: FormsGeralFornecedoresComponent;
  let fixture: ComponentFixture<FormsGeralFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsGeralFornecedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsGeralFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
