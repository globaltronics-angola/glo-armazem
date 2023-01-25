import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExistenciaArtigoComponent} from './existencia-artigo.component';

//@ts-ignore
describe('ExistenciaArtigoComponent', () => {
  let component: ExistenciaArtigoComponent;
  let fixture: ComponentFixture<ExistenciaArtigoComponent>;
  //@ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistenciaArtigoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExistenciaArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //@ts-ignore
  it('should create', () => {
    //@ts-ignore
    expect(component).toBeTruthy();
  });
});
