import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensTransferenciaComponent } from './itens-transferencia.component';

describe('ItensTransferenciaComponent', () => {
  let component: ItensTransferenciaComponent;
  let fixture: ComponentFixture<ItensTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
