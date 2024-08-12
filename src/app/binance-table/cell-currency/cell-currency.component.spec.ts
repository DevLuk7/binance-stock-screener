import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCurrencyComponent } from './cell-currency.component';

describe('CellCurrencyComponent', () => {
  let component: CellCurrencyComponent;
  let fixture: ComponentFixture<CellCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
