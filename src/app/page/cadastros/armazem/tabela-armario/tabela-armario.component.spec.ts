import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaArmarioComponent } from './tabela-armario.component';

describe('TabelaArmarioComponent', () => {
  let component: TabelaArmarioComponent;
  let fixture: ComponentFixture<TabelaArmarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaArmarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaArmarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
