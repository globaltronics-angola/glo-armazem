import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasExistenciasComponent } from './tabelas-existencias.component';

describe('TabelasExistenciasComponent', () => {
  let component: TabelasExistenciasComponent;
  let fixture: ComponentFixture<TabelasExistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelasExistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelasExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
