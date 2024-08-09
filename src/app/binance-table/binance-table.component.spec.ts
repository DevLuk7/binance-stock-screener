import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinanceTableComponent } from './binance-table.component';

describe('BinanceTableComponent', () => {
  let component: BinanceTableComponent;
  let fixture: ComponentFixture<BinanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinanceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
