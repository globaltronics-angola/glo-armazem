import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoServicoComponent } from './requisicao-servico.component';

describe('RequisicaoServicoComponent', () => {
  let component: RequisicaoServicoComponent;
  let fixture: ComponentFixture<RequisicaoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicaoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
