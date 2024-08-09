import { Component, inject, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BinanceWebSocketService } from '../../binance-web-socket.service';
import {
  filter,
  interval,
  map,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell-current-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-current-price.component.html',
  styleUrl: './cell-current-price.component.scss',
})
export class CellCurrentPriceComponent
  implements OnDestroy, ICellRendererAngularComp
{
  private readonly wsService = inject(BinanceWebSocketService);
  readonly uuid = window.crypto.randomUUID();

  readonly value$ = this.wsService.message$.pipe(
    filter((data) => data.id === this.uuid),
    map((data) => data.result.price)
  );

  private symbol$ = new Subject<string>();
  private sub: Subscription;

  constructor() {
    this.sub = this.symbol$
      .pipe(
        switchMap((symbol) =>
          interval(5000).pipe(
            startWith(symbol),
            map(() => symbol)
          )
        )
      )
      .subscribe((symbol) => {
        this.wsService.registerAvgPrice(this.uuid, symbol);
      });
  }

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }
  refresh(params: ICellRendererParams): boolean {
    this.symbol$.next(params.data.symbol);
    return true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
