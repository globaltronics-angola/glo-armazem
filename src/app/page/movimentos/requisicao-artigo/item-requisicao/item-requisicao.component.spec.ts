import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRequisicaoComponent } from './item-requisicao.component';

describe('ItemRequisicaoComponent', () => {
  let component: ItemRequisicaoComponent;
  let fixture: ComponentFixture<ItemRequisicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRequisicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemRequisicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
