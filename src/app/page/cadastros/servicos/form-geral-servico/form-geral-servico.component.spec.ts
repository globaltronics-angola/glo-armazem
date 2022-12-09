import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGeralServicoComponent } from './form-geral-servico.component';

describe('FormGeralServicoComponent', () => {
  let component: FormGeralServicoComponent;
  let fixture: ComponentFixture<FormGeralServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGeralServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGeralServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
