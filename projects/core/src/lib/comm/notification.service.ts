import { Injectable } from '@angular/core';
import { ServerService, ICdPushEnvelop } from '@corpdesk/core/src/lib/base';
import { UserService, SessService } from '@corpdesk/core/src/lib/user';
import { SocketIoService } from '@corpdesk/core/src/lib/cd-push';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  postData: any;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svSocket: SocketIoService,
  ) { }

  init(res: any) {

  }

  getByUserObsv(svUser: UserService) {
    console.log('starting NotificationService::getByUserObsv()');
    this.setEnvelopeGetByUser(svUser);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  // operator can be '=' or any sql operators including 'like'
  // Example querying json field
  // {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "NotificationController",
  //     "a": "actionGetByUser",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "filter": [
  //                     {
  //                         "fieldType": "json",
  //                         "jField": "target_user",
  //                         "jPath": "$.user_id",
  //                         "operator": "=",
  //                         "jVal": 1003
  //                     }
  //                 ]
  //             }
  //         ],
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeGetByUser(svUser: UserService) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'NotificationController',
      a: 'actionGetByUser',
      dat: {
        f_vals: [
          {
            filter: [
              {
                fieldType: 'json',
                jField: 'target_user',
                jPath: '$.user_id',
                operator: '=',
                jVal: svUser.cuid
              }
            ]
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  //  Sample:
  //  const pushEnvelop: CdPushEnvelop = {
  //     pushRecepients: null,
  //     emittEvent: null,
  //     triggerEvent: 'send-notif',
  //     req: null,
  //     resp: userDataResp
  //  };
  emitNotif(cdEnvelop: ICdPushEnvelop) {
    console.log('startng NotificationService::emitNotif()')
    this.svSocket.emit('send-notif', cdEnvelop);
  }
}
