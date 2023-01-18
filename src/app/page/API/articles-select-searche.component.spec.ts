import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSelectSearcheComponent } from './articles-select-searche.component';

describe('ArticlesSelectSearcheComponent', () => {
  let component: ArticlesSelectSearcheComponent;
  let fixture: ComponentFixture<ArticlesSelectSearcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesSelectSearcheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesSelectSearcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
