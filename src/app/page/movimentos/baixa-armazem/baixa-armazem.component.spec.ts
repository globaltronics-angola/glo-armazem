import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaixaArmazemComponent } from './baixa-armazem.component';

describe('BaixaArmazemComponent', () => {
  let component: BaixaArmazemComponent;
  let fixture: ComponentFixture<BaixaArmazemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaixaArmazemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaixaArmazemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
