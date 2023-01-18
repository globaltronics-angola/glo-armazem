import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormularioArtigosComponent} from './formulario-artigos.component';

//@ts-ignore
describe('FormularioArtigosComponent', () => {
  let component: FormularioArtigosComponent;
  let fixture: ComponentFixture<FormularioArtigosComponent>;

  //@ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioArtigosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormularioArtigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //@ts-ignore
  it('should create', () => {
    //@ts-ignore
    expect(component).toBeTruthy();
  });
});
