import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicaoTypeComponent } from './requisicao-type.component';

describe('RequisicaoTypeComponent', () => {
  let component: RequisicaoTypeComponent;
  let fixture: ComponentFixture<RequisicaoTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicaoTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicaoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
