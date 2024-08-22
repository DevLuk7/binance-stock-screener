import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IRowNode,
  SizeColumnsToFitGridStrategy,
} from 'ag-grid-community';
import { CellCurrentPriceComponent } from './cell-current-price/cell-current-price.component';
import { FiltersFormGroupValue } from '../binance-filters/binance-filters.service';
import { BinanceData } from '../binance-rest-api.service';
import { CellCurrencyComponent } from './cell-currency/cell-currency.component';
import { CellPriceChangePercentComponent } from './cell-price-change-percent/cell-price-change-percent.component';
import { coerceNumberProperty } from '@angular/cdk/coercion';

let filters: FiltersFormGroupValue;

@Component({
  selector: 'app-binance-table',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './binance-table.component.html',
  styleUrl: './binance-table.component.scss',
})
export class BinanceTableComponent {
  private gridApi!: GridApi<BinanceData>;

  readonly filters = input.required<FiltersFormGroupValue>();
  readonly rowData = input.required<BinanceData[]>();

  readonly autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
  };

  readonly defaultColDef: ColDef = {
    resizable: false,
    minWidth: 150,
  };

  readonly colDefs: ColDef[] = [
    {
      field: 'symbol',
      headerName: 'Currency',
      valueGetter: ({ data }) => data.symbol.replace('USDT', ''),
    },
    {
      field: 'volume',
      headerName: 'Trade Volume 24h',
      cellRenderer: CellCurrencyComponent,
      valueGetter: ({ data }) => coerceNumberProperty(data.quoteVolume),
    },
    {
      field: 'priceChangePercent',
      headerName: 'Price Change in percent 24h',
      cellRenderer: CellPriceChangePercentComponent,
      valueGetter: ({ data }) => data.priceChangePercent,
    },
    {
      field: 'priceChange',
      headerName: 'Price Change 24h',
      cellRenderer: CellCurrencyComponent,
      valueGetter: ({ data }) => coerceNumberProperty(data.priceChange),
    },
    {
      field: 'price',
      cellRenderer: CellCurrentPriceComponent,
      headerName: 'Current Price',
      sortable: false,
    },
  ];

  constructor() {
    effect(() => {
      filters = this.filters();
      this.gridApi?.onFilterChanged();
    });
  }

  onGridReady(params: GridReadyEvent<BinanceData>) {
    this.gridApi = params.api;
  }

  isExternalFilterPresent(): boolean {
    return true;
  }

  doesExternalFilterPass(node: IRowNode<BinanceData>): boolean {
    let pass = true;
    if (!node.data) {
      return true;
    }
    if (typeof filters.volume?.min === 'number') {
      pass = pass && +node.data.volume > filters.volume?.min;
    }
    if (typeof filters.volume?.max === 'number') {
      pass = pass && +node.data.volume < filters.volume.max;
    }
    if (typeof filters.priceChangePercent?.min === 'number') {
      pass =
        pass && +node.data.priceChangePercent > filters.priceChangePercent.min;
    }
    if (typeof filters.priceChangePercent?.max === 'number') {
      pass =
        pass && +node.data.priceChangePercent < filters.priceChangePercent.max;
    }
    if (typeof filters.priceChange?.min === 'number') {
      pass = pass && +node.data.priceChange > filters.priceChange.min;
    }
    if (typeof filters.priceChange?.max === 'number') {
      pass = pass && +node.data.priceChange < filters.priceChange.max;
    }
    return pass;
  }
}
