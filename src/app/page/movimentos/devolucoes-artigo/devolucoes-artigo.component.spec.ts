import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucoesArtigoComponent } from './devolucoes-artigo.component';

describe('DevolucoesArtigoComponent', () => {
  let component: DevolucoesArtigoComponent;
  let fixture: ComponentFixture<DevolucoesArtigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucoesArtigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucoesArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
