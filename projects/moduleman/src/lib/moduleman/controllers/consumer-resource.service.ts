import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerResourceService {
  postData: any;
  consumerResources = [];
  constructor(
    private svServer: ServerService,
    private svSess: SessService
  ) { }

  registerConsumerResourceObsv(data: any) {
    console.log('starting registerConsumerResourceObsv(data)')
    console.log('data:', data);
    this.setEnvelopeRegConsumerResource(data);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }

  setEnvelopeRegConsumerResource(regData: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerResourceController',
      a: 'actionCreate',
      dat: {
        f_vals: regData,
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespRegConsumerResource(data: any) {
    console.log(data);
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
    this.consumerResources = data;
  }

  /**
   * This is yet to be implemented at the back end.
   * For the time being, we will just fetch all the users for demo.
   * 
   * At the back-end, every consumer should have <consumer-guid>-users group
   * where it keeps all the allowed users. If you dont belong to the 
   * group, no authentication is possible.
   */
  getConsumerUsers(){

  }
}
