import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';

export interface BinanceData {
  symbol: string;
  volume: number;
  priceChangePercent: number;
  priceChange: number;
}

@Injectable({ providedIn: 'root' })
export class BinanceRestApiService {
  private readonly http = inject(HttpClient);
  readonly symbols$: Observable<BinanceData[]> = this.http
    .get<BinanceData[]>('https://api.binance.com/api/v3/ticker/24hr')
    .pipe(
      map((data: BinanceData[]) => {
        return data.filter((item: BinanceData) => item.symbol.endsWith('USDT'));
      }),
      startWith([])
    );
}
