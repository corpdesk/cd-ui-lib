import { Injectable } from '@angular/core';
import { ServerService, CdFilter } from '@corpdesk/core/src/lib/base';
import { UserService, SessService } from '@corpdesk/core/src/lib/user';
/* avoid due to circular dependency */ //
// import { UserService } from '../../user/controllers/user.service';
import { SocketIoService } from '@corpdesk/core/src/lib/cd-push';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  postData: any;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    // private svSocket: SocketIoService,
  ) { }

  init(res: any) {

  }

  /**
   * Array of custom sql-like filters.
   * @param f: CdFilter[]
   */
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
}
