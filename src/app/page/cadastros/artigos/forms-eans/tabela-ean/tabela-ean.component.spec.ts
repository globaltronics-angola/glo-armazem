import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaEanComponent } from './tabela-ean.component';

describe('TabelaEanComponent', () => {
  let component: TabelaEanComponent;
  let fixture: ComponentFixture<TabelaEanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaEanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaEanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
