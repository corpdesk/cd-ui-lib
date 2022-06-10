import { Injectable } from '@angular/core';
import { CdPushEnvelop, DEFAULT_PUSH_RECEPIENTS } from './cd-push.model';

@Injectable({
  providedIn: 'root',
})
export class CdPushService {
  pushEnvelop: CdPushEnvelop = {
    pushRecepients: [],
    pushData: null,
    emittEvent: 'push-notif',
    triggerEvent: 'send-notif',
    req: null,
    resp: null
  };
  constructor() {
  }

  init(iClient:any){
    console.log('core/CdPushService::init()/01')
    DEFAULT_PUSH_RECEPIENTS[0].user_id = iClient.baseModel.sess.userId; 
    DEFAULT_PUSH_RECEPIENTS[0].sub_type_id = 7;
    this.pushEnvelop.pushRecepients = DEFAULT_PUSH_RECEPIENTS;
  }
}
