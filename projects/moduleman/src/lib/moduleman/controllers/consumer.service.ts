import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
postData: any;
selectedConsumers: any = [];
isInvalidSelConsumers = true;
consumers: any;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { 
    this.getAll();
  }

  
  getAll() {
    this.setEnvelopeGetAll();
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespGetAll(res['data']);
      });
  }

  getAllObsv() {
    this.setEnvelopeGetAll();
    return this.svServer.proc(this.postData);
  }


  /**
   * 
   * @param data 
   * {
        "ctx": "Sys",
        "m": "Moduleman",
        "c": "ConsumerController",
        "a": "actionGetAll",
        "dat": {
            "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
        },
        "args": null
    }
   */
  setEnvelopeGetAll() {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerController',
      a: 'actionGetAll',
      dat: {
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespGetAll(data: any) {
    console.log('ConsumerService::setResGetAll()');
    console.log(data);
    this.consumers = data;
  }
}
