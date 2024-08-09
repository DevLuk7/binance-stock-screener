import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCurrentPriceComponent } from './cell-current-price.component';

describe('CellCurrentPriceComponent', () => {
  let component: CellCurrentPriceComponent;
  let fixture: ComponentFixture<CellCurrentPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellCurrentPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellCurrentPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
