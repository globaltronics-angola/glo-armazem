import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdgetChartComponent } from './wdget-chart.component';

describe('WdgetChartComponent', () => {
  let component: WdgetChartComponent;
  let fixture: ComponentFixture<WdgetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdgetChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdgetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
