import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellPriceChangePercentComponent } from './cell-price-change-percent.component';

describe('CellPriceChangePercentComponent', () => {
  let component: CellPriceChangePercentComponent;
  let fixture: ComponentFixture<CellPriceChangePercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellPriceChangePercentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellPriceChangePercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
