import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalarioInventarioComponent } from './formalario-inventario.component';

describe('FormalarioInventarioComponent', () => {
  let component: FormalarioInventarioComponent;
  let fixture: ComponentFixture<FormalarioInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormalarioInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormalarioInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
