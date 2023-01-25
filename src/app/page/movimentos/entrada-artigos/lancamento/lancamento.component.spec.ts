import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LancamentoComponent} from './lancamento.component';

//@ts-ignore
describe('LancamentoComponent', () => {
  let component: LancamentoComponent;
  let fixture: ComponentFixture<LancamentoComponent>;
//@ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LancamentoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
//@ts-ignore
  it('should create', () => {
    //@ts-ignore
    expect(component).toBeTruthy();
  });
});
