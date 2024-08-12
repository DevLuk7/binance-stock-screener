import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-cell-price-change-percent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-price-change-percent.component.html',
  styleUrl: './cell-price-change-percent.component.scss',
})
export class CellPriceChangePercentComponent {
  value: number = 0;

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }
  refresh(params: ICellRendererParams): boolean {
    this.value = coerceNumberProperty(params.value);
    return true;
  }
}
