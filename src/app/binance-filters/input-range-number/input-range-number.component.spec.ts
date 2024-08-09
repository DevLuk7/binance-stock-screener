import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRangeNumberComponent } from './input-range-number.component';

describe('InputRangeNumberComponent', () => {
  let component: InputRangeNumberComponent;
  let fixture: ComponentFixture<InputRangeNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRangeNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRangeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
