import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { wsProtocol, backendPort, backendDomainName } from 'src/app/configuration';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: Socket;
  readonly url: string = `${wsProtocol}://${backendPort}:${backendDomainName}`;

  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void{
    this.socket.emit(eventName, data);
  }
}
