import { Component, effect, forwardRef, input, model } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface InputRangeNumberValue {
  min: null | number;
  max: null | number;
}

export const generateInputRangeNumberValue = () =>
  new FormControl<InputRangeNumberValue>({ min: null, max: null });

@Component({
  selector: 'app-input-range-number',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './input-range-number.component.html',
  styleUrl: './input-range-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRangeNumberComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputRangeNumberComponent),
      multi: true,
    },
  ],
})
export class InputRangeNumberComponent
  implements ControlValueAccessor, Validator
{
  readonly label = input<string>();

  private _onChange = (_: any) => {};
  private _onTouched = (_: any) => {};
  private onValidatorChange = () => {};

  valueMin = model<number | null>(null);
  valueMax = model<number | null>(null);

  constructor() {
    effect(() => {
      this._onChange({ min: this.valueMin(), max: this.valueMax() });
      this._onTouched({ min: this.valueMin(), max: this.valueMax() });
    });
  }

  writeValue(obj: any): void {
    const min = this.getMinMaxValue(obj).min;
    const max = this.getMinMaxValue(obj).max;

    this.valueMin.set(min);
    this.valueMax.set(max);
  }
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = this.getMinMaxValue(control.value);

    if (value.min === null || value.max === null) {
      return null;
    }

    if (value.min > value.max) {
      return { minMax: { min: value.min, max: value.max } };
    }

    return null;
  }

  private getMinMaxValue(value: any): InputRangeNumberValue {
    const min = isNaN(+value?.min) || value?.min === null ? null : +value?.min;
    const max = isNaN(+value?.max) || value?.max === null ? null : +value?.max;
    return { min, max };
  }
}
