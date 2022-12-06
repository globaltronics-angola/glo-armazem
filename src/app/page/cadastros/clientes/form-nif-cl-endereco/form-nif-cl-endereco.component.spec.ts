import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNifClEnderecoComponent } from './form-nif-cl-endereco.component';

describe('FormNifClEnderecoComponent', () => {
  let component: FormNifClEnderecoComponent;
  let fixture: ComponentFixture<FormNifClEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNifClEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNifClEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
