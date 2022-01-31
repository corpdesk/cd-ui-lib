import { Injectable, Inject } from '@angular/core';
// import { CdFilter } from '@corpdesk/base';
// import { CdFilter } from '../../../base';
import { ServerService, CdFilter, EnvConfig } from '@corpdesk/core/src/lib/base';
import { SessService } from './sess.service';
import { GroupMember, GroupMemberInput } from './group-member-model';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  postData: any;
  constructor(
    private svServer: ServerService,
    @Inject('env') private env: EnvConfig,
    private svSess: SessService,
  ) { }

  createObsv(members: GroupMember[]) {
    console.log('starting createObsv()');
    this.setEnvelopeCreate(members);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }


  setEnvelopeCreate(members: GroupMember[]) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionCreate',
      dat: {
        f_vals: members,
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  /**
   * this method inserts new member with assigned parent group
   * create a group member of type 'group'
   * nb: a member can also be 'user' or other types
   * @param members : GroupMemberInput[]
   */
  createGroupMemberObsv(members: GroupMemberInput[]) {
    console.log('starting createObsv()');
    this.setEnvelopeCreateGroupMember(members);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // /**
  // create a member of group type - with a selected parent group
  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupMemberController",
  //     "a": "actionCreateGroup",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "group": {
  //                     "group_name": "projectB",
  //                     "group_description": "testing",
  //                     "group_type_id": "7",
  //                     "module_guid": "-dkkm6"
  //                 },
  //                 "data": {
  //                     "group_guid_parent": "D7FF9E61-B143-D083-6130-A51058AD9630"
  //                 }
  //             }
  //         ],
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeCreateGroupMember(members: GroupMemberInput[]) {
    // SAMPLE:
    // members = [
    //               {
    //                   "group": {
    //                       "group_name": "projectB",
    //                       "group_description": "testing",
    //                       "group_type_id": "7",
    //                       "module_guid": "-dkkm6"
    //                   },
    //                   "data": {
    //                       "group_guid_parent": "D7FF9E61-B143-D083-6130-A51058AD9630"
    //                   }
    //               }
    //           ];
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionCreateGroup',
      dat: {
        f_vals: members,
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  removeUser() {

  }

  getAll() {

  }

  get(filter: any) {

  }

  getGroupMemberObsv(filter: CdFilter[]) {
    console.log('starting getGroupMemberObsv()');
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
    // let f;
    // if (parentGuid) {
    //   f = [
    //     {
    //       field: 'group_guid_parent',
    //       operator: '=',
    //       val: parentGuid
    //     }
    //   ];
    // } else {
    //   f = null;
    // }
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionGroupMember2',
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

  
  getGetPalsObsv() {
    console.log('starting getGetPalsObsv()');
    this.setEnvelopeGetPals();
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }

  // /**
  //  * {
  //       "ctx": "Sys",
  //       "m": "User",
  //       "c": "GroupMemberController",
  //       "a": "actionGetPals",
  //       "dat": {
  //           "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //       },
  //       "args": null
  //   }
  //  */
  setEnvelopeGetPals() {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionGetPals',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }
}
