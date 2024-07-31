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
// import { io } from 'socket.io-client';
// import { Socket } from 'ngx-socket-io';
// import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvConfig } from '../base';
// import { EnvConfig } from '@corpdesk/core';


@Injectable({
    providedIn: 'root'
})
export class NgxSocketIoService {
    constructor(
        // private socket: Socket,
        @Inject('env') private env: EnvConfig,
    ) {

    }

    //   listen(eventName: string) {
    //     console.log('core/SocketioService::listen()/01')
    //     return new Observable(subscriber => {
    //       this.socket.on(eventName, (data: any) => {
    //         console.log('core/SocketioService::listen()/eventName:', eventName)
    //         console.log('core/SocketioService::listen()/data:', data)
    //         subscriber.next(data);
    //       });
    //     });
    //   }

    //   emit(eventName: string, data: any) {
    //     // this.socket.emit(eventName, data);
    //     this.socket.emit(eventName, data, function (state:any) {
    //       if (state.error) 
    //         console.log('Something went wrong on the server. ServerError:', state.error);
    //       if (state.ok)
    //         console.log('Event was processed successfully');
    //     });
    //   }

    // emit(msg: string) {
    //     this.socket.emit('message', msg);
    // }

    // listen$(eventName: string) {
    //     return this.socket.fromEvent(eventName);
    // }



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
