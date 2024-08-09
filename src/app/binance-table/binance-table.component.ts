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

  readonly defaultColDef = {
    resizable: false,
  };

  readonly colDefs: ColDef[] = [
    { field: 'symbol' },
    {
      field: 'volume',
      valueGetter: ({ data }) => {
        return `${Number(data.volume).toFixed(2)}`;
      },
    },
    {
      field: 'priceChangePercent',
      valueGetter: ({ data }) => {
        return `${Number(data.priceChangePercent).toFixed(2)} %`;
      },
    },
    {
      field: 'priceChange',
      valueGetter: ({ data }) => {
        return `${Number(data.priceChange).toFixed(3)}`;
      },
    },
    {
      field: 'price',
      cellRenderer: CellCurrentPriceComponent,
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
