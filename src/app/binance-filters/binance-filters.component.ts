import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InputRangeNumberComponent } from './input-range-number/input-range-number.component';
import { BinanceFiltersService } from './binance-filters.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputRangeNumberComponent,
  ],
  templateUrl: './binance-filters.component.html',
  styleUrl: './binance-filters.component.scss',
})
export class FiltersComponent {
  readonly formGroup = inject(BinanceFiltersService).formGroup;

  reset() {
    this.formGroup.reset();
  }
}
