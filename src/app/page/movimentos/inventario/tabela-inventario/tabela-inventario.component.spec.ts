import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaInventarioComponent } from './tabela-inventario.component';

describe('TabelaInventarioComponent', () => {
  let component: TabelaInventarioComponent;
  let fixture: ComponentFixture<TabelaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
