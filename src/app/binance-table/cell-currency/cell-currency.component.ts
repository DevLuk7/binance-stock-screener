import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-cell-currency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-currency.component.html',
  styleUrl: './cell-currency.component.scss',
})
export class CellCurrencyComponent {
  value: string = '';

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
