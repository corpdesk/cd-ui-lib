import { Injectable } from '@angular/core';
// import { CdFilter } from '../../../base/models/b.model';
// import { CdFilter } from '@corpdesk/core/src/lib/base/models/b.model';
import { CdFilter } from '@corpdesk/base/src/lib/base';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { GroupInvitation } from '../models/group-invitation-model';

@Injectable({
  providedIn: 'root'
})
export class GroupInvitationService {
  postData: any;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  getGroupInvitationObsv(filter: CdFilter[]) {
    console.log('starting getGroupInvitationObsv()');
    this.setEnvelopeGroupMember(filter);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupMemberController",
  //     "a": "actionGroupMember",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "filter": [
  //                     {
  //                         "field": "group_guid_parent",
  //                         "operator": "=",
  //                         "val": "5D865522-6"
  //                     }
  //                 ]
  //             }
  //         ],
  //         "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //     },
  //     "args": null
  // }
  setEnvelopeGroupMember(f: CdFilter[]) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupInvitationController',
      a: 'actionGet',
      dat: {
        f_vals: [
          {
            filter: f
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  createObsv(i: GroupInvitation) {
    console.log('starting createObsv()');
    this.setEnvelopeCreate(i);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }
  
  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "User",
  //         "c": "GroupInvitationController",
  //         "a": "actionCreate",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "data": {
  //                         "hostUser": "1010",
  //                         "guestUser": "1003",
  //                         "group_invitation_type_id": "1313"
  //                     }
  //                 }
  //             ],
  //             "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeCreate(i: GroupInvitation) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupInvitationController',
      a: 'actionCreate',
      dat: {
        f_vals: [
          {
            data: i
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

}
