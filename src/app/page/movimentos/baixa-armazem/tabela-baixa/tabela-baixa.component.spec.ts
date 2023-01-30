import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaBaixaComponent } from './tabela-baixa.component';

describe('TabelaBaixaComponent', () => {
  let component: TabelaBaixaComponent;
  let fixture: ComponentFixture<TabelaBaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaBaixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaBaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
