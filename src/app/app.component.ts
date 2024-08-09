import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FiltersComponent } from './binance-filters/binance-filters.component';
import { FiltersFormGroupValue } from './binance-filters/binance-filters.service';
import { BinanceRestApiService } from './binance-rest-api.service';
import { CommonModule } from '@angular/common';
import { BinanceTableComponent } from './binance-table/binance-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    BinanceTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly dialog = inject(MatDialog);
  readonly rowData$ = inject(BinanceRestApiService).symbols$;
  readonly filters = signal<FiltersFormGroupValue>({
    volume: { min: null, max: null },
    priceChangePercent: { min: null, max: null },
    priceChange: { min: null, max: null },
  });

  showFilters() {
    const dialogRef = this.dialog.open(FiltersComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filters.set(result);
      }
    });
  }
}
