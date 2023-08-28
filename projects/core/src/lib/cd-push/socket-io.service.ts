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
import { BehaviorSubject } from 'rxjs';
// import { EnvConfig } from '@corpdesk/core';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket: any;
  readonly url: string = '';
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    @Inject('env') private env: EnvConfig,
  ) {
    // this.socket = io(`${environment.apiEndpoint}:` + environment.SOCKET_IO_PORT);
    // this.socket = io.connect('https://localhost', {secure: true});
    this.url = `${this.env.apiEndpoint}:` + this.env.SOCKET_IO_PORT;
    console.log('core/SocketioService::constructor()/eventName:', this.url)
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    console.log('core/SocketioService::listen()/01')
    console.log('core/SocketioService::listen()/eventName:', eventName)
    return new Observable(subscriber => {
      return this.socket.on(eventName, (data: any) => {
        console.log('core/SocketioService::listen()/this.socket.on()/eventName:', eventName)
        console.log('core/SocketioService::listen()/this.socket.on()/data:', data)
        subscriber.next(data);
      });
    });
  }

  listen2(eventName: string) {
    console.log('core/SocketioService::listen()/01')
    console.log('core/SocketioService::listen()/eventName:', eventName)
    this.socket.on(eventName, (data: any) => {
      console.log('core/SocketioService::listen()/this.socket.on()/eventName:', eventName)
      console.log('core/SocketioService::listen()/this.socket.on()/data:', data)
    });
  }

  public getNewMessage = (eventName:string) => {
    console.log('core/SocketioService::getNewMessage()/01')
    this.socket.on(eventName, (data:any) =>{
      console.log('core/SocketioService::getNewMessage()/this.socket.on()/eventName:', eventName)
      console.log('core/SocketioService::getNewMessage()/this.socket.on()/data:', data)
      this.message$.next(data);
    });
    return this.message$.asObservable();
  };

  emit(eventName: string, data: any) {
    console.log('core/SocketioService::emit()/01')
    // this.socket.emit(eventName, data);
    this.socket.emit(eventName, data, function (state:any) {
      console.log('core/SocketioService::emit()/02')
      console.log('core/SocketioService::emit()/state:', state)
      if (state.error) 
        console.log('Something went wrong on the server. ServerError:', state.error);
      if (state.ok)
        console.log('Event was processed successfully');
    });
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
