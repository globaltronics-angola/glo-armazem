import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoArtigoComponent } from './requisicao-artigo.component';

describe('RequisicaoArtigoComponent', () => {
  let component: RequisicaoArtigoComponent;
  let fixture: ComponentFixture<RequisicaoArtigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoArtigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicaoArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
