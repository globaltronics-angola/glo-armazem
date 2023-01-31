import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgetStorageComponent } from './wdget-storage.component';

describe('WdgetStorageComponent', () => {
  let component: WdgetStorageComponent;
  let fixture: ComponentFixture<WdgetStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdgetStorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdgetStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
