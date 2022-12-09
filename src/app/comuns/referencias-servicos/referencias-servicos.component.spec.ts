import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasServicosComponent } from './referencias-servicos.component';

describe('ReferenciasServicosComponent', () => {
  let component: ReferenciasServicosComponent;
  let fixture: ComponentFixture<ReferenciasServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenciasServicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenciasServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
