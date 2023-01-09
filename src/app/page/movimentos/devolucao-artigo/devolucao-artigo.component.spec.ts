import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucaoArtigoComponent } from './devolucao-artigo.component';

describe('DevolucaoArtigoComponent', () => {
  let component: DevolucaoArtigoComponent;
  let fixture: ComponentFixture<DevolucaoArtigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucaoArtigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucaoArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
