import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaServisoComponent } from './referencia-serviso.component';

describe('ReferenciaServisoComponent', () => {
  let component: ReferenciaServisoComponent;
  let fixture: ComponentFixture<ReferenciaServisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenciaServisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenciaServisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
