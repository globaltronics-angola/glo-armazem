import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDevolucaoComponent } from './items-devolucao.component';

describe('ItemsDevolucaoComponent', () => {
  let component: ItemsDevolucaoComponent;
  let fixture: ComponentFixture<ItemsDevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsDevolucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
