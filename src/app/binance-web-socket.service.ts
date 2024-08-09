import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class BinanceWebSocketService {
  private socket$: WebSocketSubject<any> = webSocket(
    'wss://ws-api.binance.com:443/ws-api/v3'
  );
  readonly message$ = this.socket$.asObservable();

  registerAvgPrice(uuid: string, symbol: string) {
    this.socket$.next({
      id: uuid,
      method: 'avgPrice',
      params: {
        symbol,
      },
    });
  }
}
