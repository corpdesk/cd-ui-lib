/**
 * Below is short description of how the cd-push system works:
 * 1. When user login, the push server is registers the user socket connection
 * 2. Additionally register all events required by relevant modules
 * 3. Thereafter, when a module that needs push services is launched, it starts listening to the appropriate events.
 * 4. Any event emitted to the server will then be relayed to the appropriate destination.
 * ToDo:
 * - capacity to register push events via gui system admin
 */

import { Injectable, Inject } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { EnvConfig } from '@corpdesk/core/src/lib/base';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket: any;
  readonly url: string = '';
  constructor(
    @Inject('env') private env: EnvConfig,
  ) {
    // this.socket = io(`${environment.HOST}:` + environment.SOCKET_IO_PORT);
    // this.socket = io.connect('https://localhost', {secure: true});
    this.url = `${this.env.HOST}:` + this.env.SOCKET_IO_PORT;
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // ////////////////////////////////////////////
  // public sendMessage(message) {
  //   this.socket.emit('new-message', message);
  // }

  // public getMessages = () => {
  //   return Observable.create((observer) => {
  //     this.socket.on('new-message', (message) => {
  //       observer.next(message);
  //     });
  //   });
  // }
}
