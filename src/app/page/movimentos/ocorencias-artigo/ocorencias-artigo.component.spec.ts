import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorenciasArtigoComponent } from './ocorencias-artigo.component';

describe('OcorenciasArtigoComponent', () => {
  let component: OcorenciasArtigoComponent;
  let fixture: ComponentFixture<OcorenciasArtigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcorenciasArtigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcorenciasArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
