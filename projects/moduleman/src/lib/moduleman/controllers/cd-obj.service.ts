import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';

@Injectable({
  providedIn: 'root'
})
export class CdObjService {
  private postData: any;
  currentModule = '';
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService
  ) { }

  // get cd_obj_type by name
  actionGetType(data: any) {
    console.log(data);
    console.log(data.is_sys_module);
    this.setEnvelopeGetType(data);
    /*
    post request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespGetType(res.data);
      });
  }

  cleanRegData(data: any) {
    data.is_sys_module = Number(data.is_sys_module);
    if (data.is_sys_module === 1) {
      data.is_sys_module = true;
    } else {
      data.is_sys_module = false;
    }
    data.module_type_id = Number(data.module_type_id);
    return data;
  }

  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "CDObjController",
  //         "a": "actionGetTypes",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "data": {
  //                         "cd_obj_type_name": "guig_actions"
  //                     }
  //                 }
  //             ],
  //             "token": "C64AC158-80F7-5AA7-D3A6-240E399B1A0A"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeGetType(Data: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'CDObjController',
      a: 'actionGetTypes',
      dat: {
        f_vals: [{
          data: Data
        }],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespGetType(data: any) {
    console.log(data);
  }
}
