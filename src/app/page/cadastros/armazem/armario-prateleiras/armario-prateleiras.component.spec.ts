import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarioPrateleirasComponent } from './armario-prateleiras.component';

describe('ArmarioPrateleirasComponent', () => {
  let component: ArmarioPrateleirasComponent;
  let fixture: ComponentFixture<ArmarioPrateleirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmarioPrateleirasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmarioPrateleirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
