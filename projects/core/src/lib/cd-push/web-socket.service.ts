import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ICdPushEnvelop } from './IBase';
import { throwError } from 'rxjs';
import { delay, mergeMap, retry, retryWhen, share, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { pushEnvelop } from './message.model';
import { of } from 'rxjs';
import { WsHttpService } from '.';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<unknown>;
  public data$: any;
  public jwtToken: string;
  private insecure: boolean = false;
  public messageStore: ICdPushEnvelop[] = [];
  public pongStore: ICdPushEnvelop[] = [];
  private maxRetry = 10;
  private connectionOk = false;
  private pushGuid = '';
  constructor(
    private svWsHttp: WsHttpService,
  ) {
    this.pushGuid = uuidv4();
    console.log('WebsocketService::construct()/this.pushGuid:', this.pushGuid)
    pushEnvelop.pushData.pushGuid = this.pushGuid;
    if (this.insecure) {
      this.connect();
      this.subscribeListen();
    }
  }

  public subscribeListen() {
    this.data$.subscribe(
      (msg: any) => {
        this.onMsgReceived(msg);
      }, // Called whenever there is a message from the server.
      (err: any) => {
        console.log('Subscrib Error:', err)
      }, // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  public sendMsg(pushEnvelop: ICdPushEnvelop) {
    console.log('WebsocketService::sendMsg()/01')
    console.log('WebsocketService::sendMsg()/pushEnvelop:', pushEnvelop)
    if (this.connectionOk === true) {
      console.log('WebsocketService::sendMsg()/02')
      this.socket$.next(pushEnvelop);
      this.saveMessage(pushEnvelop);
      setTimeout(
        () => {
          console.log(`starting message confirmation for: ${JSON.stringify(pushEnvelop)}`);
          if (this.isRelayed(pushEnvelop)) {
            console.log('message was relayed SUCCESSFULLY')
          } else {
            this.onMsgFailure();
          }
        }, 9000);
    } else {
      console.log('WebsocketService::sendMsg()/03')
      this.saveMessage(pushEnvelop);
    }

  }

  connect() {
    this.socket$ = webSocket(`ws://cd-sio-23:3000/ws`);
    this.data$ = this.socket$
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error:', err);
            }),
            delay(1000)
          )
        ),
        share(), // to make sure only one subscription is created
      );
  }

  getValueFromHttp(userName: string, password: string) {
    return new Promise(resolve => {
      this.svWsHttp.jwtAuth$(userName, password)
        .subscribe(
          (data: any) => {
            console.log(data);
            resolve(data);
          })
    })
  }

  /**
   * connect to websocket with jwtToken
   * the token need to have been aquired during initialization.
   * @param jwtToken 
   * @returns 
   */
  connectSecure(jwtToken: string, resourceGuid:string) {
    console.log('WebsocketService::connectSecure()/01')
    this.socket$ = webSocket(
      {
        url: `ws://cd-sio-23:3000/ws?token=${jwtToken}&rg=${resourceGuid}`,
        openObserver: {
          next: () => {
            console.log("connection ok");
            this.connectionOk = true;
            // this.testMsg('this is test msg');
          },
        },
        closeObserver: {
          next: (closeEvent) => {
            console.log("connection closed");
            this.connectionOk = false;
          }
        },
      }
    );
    return this.socket$
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error:', err);
            }),
            delay(1000)
          )
        ),
        share(), // to make sure only one subscription is created
      );
  }
  // async connectSecure(userName: string, password: string) {
  //   console.log('WebsocketService::connectSecure()/01')
  //   // const requestUrl = 'http://cd-sio-23:3000/auth?username=' + userName + '&password=' + password;
  //   // console.log('WebsocketService::connectSecure()/requestUrl:', requestUrl);
  //   try {
  //     const authResponse: any = await this.getValueFromHttp(userName, password);
  //     this.jwtToken = authResponse.token;
  //     console.log('init()/authResponse:', authResponse);
  //     console.log('init()/this.jwtToken:', this.jwtToken);
  //     this.socket$ = webSocket(
  //       {
  //         url: `ws://cd-sio-23:3000/ws?token=${this.jwtToken}`,
  //         openObserver: {
  //           next: () => {
  //             console.log("connection ok");
  //             this.connectionOk = true;
  //           },
  //         },
  //         closeObserver: {
  //           next: (closeEvent) => {
  //             console.log("connection closed");
  //             this.connectionOk = false;
  //           }
  //         },
  //       }
  //     );
  //     return this.socket$
  //       .pipe(
  //         retryWhen(errors =>
  //           errors.pipe(
  //             tap(err => {
  //               console.error('Got error:', err);
  //             }),
  //             delay(1000)
  //           )
  //         ),
  //         share(), // to make sure only one subscription is created
  //       );
  //   } catch (e) {
  //     console.log('wsConnection Error:', e)
  //     return of(null);
  //   }
  // }

  /**
   * sycronize jwt aquisition and secure connection
   * during initialization
   * @param userName 
   * @param password 
   * @returns 
   */
  // init(userName: string, password: string) {
  //   return this.svHttp.jwtAuth$(userName, password)
  //     .pipe(
  //       mergeMap((authResponse: any) => {
  //         console.log('init()/authResponse:', authResponse);
  //         this.jwtToken = authResponse.token;
  //         return this.connectSecure(authResponse.token)
  //       })
  //     );
  // }

  /**
   * lunch WebsocketService securely to listen to
   * incoming messages
   * @param userName 
   * @param password 
   */
  // listenSecure(userName: string, password: string) {
  //   this.init(userName, password).subscribe(
  //     (msg: any) => {
  //       this.onMsgReceived(msg);
  //     }, // Called whenever there is a message from the server.
  //     (err: any) => {
  //       console.log('Subscriber Error:', err)
  //     }, // Called if at any point WebSocket API signals some kind of error.
  //     () => console.log('complete') // Called when connection is closed (for whatever reason).
  //   );
  // }
  // listenSecure(userName: string, password: string) {
  //   of(this.connectSecure(userName, password))
  //   // .subscribe(
  //   //   (msg: any) => {
  //   //     this.onMsgReceived(msg);
  //   //   }, // Called whenever there is a message from the server.
  //   //   (err: any) => {
  //   //     console.log('Subscriber Error:', err)
  //   //   }, // Called if at any point WebSocket API signals some kind of error.
  //   //   () => console.log('complete') // Called when connection is closed (for whatever reason).
  //   // );
  // }
  listenSecure(jwtToken: string, resourceGuid:string) {
    console.log('WebSocketService::listenSecure()/01')
    return this.connectSecure(jwtToken, resourceGuid)
      // .subscribe(
      //   (msg: any) => {
      //     this.onMsgReceived(msg);
      //   }, // Called whenever there is a message from the server.
      //   (err: any) => {
      //     console.log('Subscriber Error:', err)
      //   }, // Called if at any point WebSocket API signals some kind of error.
      //   () => console.log('complete') // Called when connection is closed (for whatever reason).
      // );
  }

  onMsgReceived(msg: ICdPushEnvelop) {
    this.connectionOk = true;
    console.log('message received: ' + JSON.stringify(msg));
    this.pong(msg);
  }

  /**
   * - implement retryies limits
   * - space retry periods eg 1s, 3s, 9s, 27s, Abort, send fatal error.
   */
  onMsgFailure() {
    this.connectionOk = false;
    console.log('onMsgFailure()/this.jwtToken', this.jwtToken)
    const unsentMessages = this.messageStore.filter((m) => !m.pushData.commTrack.relayed);
    console.log('onMsgFailure()/unsentMessages:', JSON.stringify(unsentMessages));
    // return throwError('Connection interrupted');
    // throw Error('Valid token not returned');
    // this.resetSocket();
  }

  resetSocket() {
    console.log('resetSocket()/01')
    pushEnvelop.pushData.m = 'CdPushModule';
    pushEnvelop.pushData.pushGuid = this.pushGuid;
    pushEnvelop.pushData.triggerEvent = 'reset-socket';
    // this.sendMsg(pushEnvelop);
  }

  pong(msg: ICdPushEnvelop) {
    if (this.isSaved(msg)) {
      this.flagRelayed(msg)
    }
  }

  isSaved(msg: ICdPushEnvelop): boolean {
    return this.messageStore.filter((m) => msg.pushData.commTrack.initTime === m.pushData.commTrack.initTime).length > 0;
  }

  isRelayed(msg: ICdPushEnvelop): boolean {
    return this.messageStore.filter((m) => msg.pushData.commTrack.relayed).length > 0;
  }

  saveMessage(msg: ICdPushEnvelop) {
    this.messageStore.push(msg);
  }

  /**
   * relay means there was response from the server
   * after sending a message.
   * @param msg 
   */
  flagRelayed(msg: ICdPushEnvelop) {
    this.messageStore.forEach((m) => {
      if (m.pushData.commTrack.initTime === msg.pushData.commTrack.initTime) {
        m.pushData.commTrack.relayed = true;
      }
    })
  }

  testMsg(m: string) {
    // pushEnvelop.req = setEnvelopeSendComm(sendData,commSubscribers)
    console.log('SocketService::testMsg()/pushEnvelop:', pushEnvelop)
    // if (sendData.controls['msg'].value.length > 0) {
    //   this.svWs.sendMsg(pushEnvelop);
    // }
    pushEnvelop.pushData.m = 'CdPushModule';
    pushEnvelop.pushData.emittEvent = 'init-test-msg';
    this.sendMsg(pushEnvelop);
  }
}