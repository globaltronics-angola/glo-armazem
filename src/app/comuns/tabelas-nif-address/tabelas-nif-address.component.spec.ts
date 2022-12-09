import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasNifAddressComponent } from './tabelas-nif-address.component';

describe('TabelasNifAddressComponent', () => {
  let component: TabelasNifAddressComponent;
  let fixture: ComponentFixture<TabelasNifAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelasNifAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelasNifAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
