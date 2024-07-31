import { Injectable } from '@angular/core';
import { DEFAULT_PUSH_RECEPIENTS } from './cd-push.model';
import { ICdPushEnvelop } from '../base';

@Injectable({
  providedIn: 'root',
})
export class CdPushService {
  // pushEnvelop: ICdPushEnvelop = {
  //   pushRecepients: [],
  //   pushData: null,
  //   emittEvent: 'push-notif',
  //   triggerEvent: 'send-notif',
  //   req: null,
  //   resp: null
  // };
  pushEnvelop: ICdPushEnvelop = {
    pushData: {
      appId: '',
      appSockets: [],
      pushGuid: '',
      m: null,
      pushRecepients: [],
      emittEvent: 'push-notif',
      triggerEvent: 'send-notif',
      token: '',
      commTrack: {
        initTime: null,
        relayTime: null,
        pushed: false,
        pushTime: null,
        relayed: false,
        deliveryTime: null,
        delivered: false,
        completed: false,
        completedTime: null,
        cached: false,
        cachedTime: null,
        saved: false,
        savedTime: null
      },
      isNotification: null,
      isAppInit: null
    },
    req: null,
    resp: null
  };
  constructor() {
  }

  init(iClient: any) {
    console.log('core/CdPushService::init()/01')
    DEFAULT_PUSH_RECEPIENTS[0].userId = iClient.baseModel.sess.userId;
    DEFAULT_PUSH_RECEPIENTS[0].subTypeId = 7;
    this.pushEnvelop.pushData.pushRecepients = DEFAULT_PUSH_RECEPIENTS;
  }
}
