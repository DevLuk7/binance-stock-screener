import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { generateInputRangeNumberValue } from './input-range-number/input-range-number.component';

@Injectable({ providedIn: 'root' })
export class BinanceFiltersService {
  readonly formGroup: FiltersFormGroup = generateFiltersFormGroup();
}

export const generateFiltersFormGroup = () =>
  new FormGroup({
    volume: generateInputRangeNumberValue(),
    priceChangePercent: generateInputRangeNumberValue(),
    priceChange: generateInputRangeNumberValue(),
  });

export type FiltersFormGroup = ReturnType<typeof generateFiltersFormGroup>;
export type FiltersFormGroupValue = ReturnType<FiltersFormGroup['getRawValue']>;
