import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';


import { ServerService } from '@corpdesk/core/src/lib/base';
import { BaseService, AppStateService, ICdResponse, IAppState, 
  CacheData, EnvConfig, ICdPushEnvelop, ICdRequest } from '@corpdesk/core/src/lib/base';
import { SocketIoService } from '@corpdesk/core/src/lib/cd-push';

interface Menu {
  items: any;
};

@Injectable({
  providedIn: 'root'
})
export class SessService {
  token: any;
  consumerToken = '';
  countdown: any;
  distance: any;
  subscription: any;
  maxDistance: any;
  countDownDate: any;
  endTime: any;
  postData: any;
  config = {
    countdown: false
  };
  isActive = false;
  activeModules$: Observable<Menu> = new Observable<Menu>();
  appState: IAppState = {
    success: false,
    info: {
      messages: [],
      code: null,
      app_msg: ''
    },
    sess: null,
    cache: {}
  };

  // @Output() emittMenu = new EventEmitter<any>();
  pushRecepients: any = [];

  constructor(
    private svAppState: AppStateService,
    private svServer: ServerService,
    @Inject('env') private env: EnvConfig,
    private svSocket: SocketIoService,
    private svBase: BaseService,
  ) {

  }



  /*
  Every time successfull response come from server,
  it needs to update the client session to extend the Expiration time
  NB: svUseris not injected here but input as an argument
  ...otherwise cyclic error will be thrown
  */
  createSess(res: any, svMenu: any) {
    // console.log('starting SessService::createSess(res,svUser: UserService)');
    this.token = res.app_state.sess.cd_token;
    this.setSess(res, svMenu);
    // svUser.getUserData(res);
    this.svServer.token = res.app_state.sess.cd_token;
    this.isActive = true;
    this.setModulesData();
  }

  setSess(res: ICdResponse, svMenu: any) {
    // console.log('starting setSess(res: any)');
    this.isActive = true;
    this.appState = res.app_state;
    // this.maxDistance = Number(ttl) * 1000;
    // localStorage.setItem('maxDistance-' + this.token, this.maxDistance);
    // localStorage.setItem('sess-' + this.token, JSON.stringify(sess));
    // localStorage.setItem('ExprTime-' + this.token, this.getExprTime(ttl));

    // if (this.config.countdown) {
    //   this.countDown(this.getExprTime(ttl));
    // }
    console.log('SessService::setSess()/res.data:', res.data)
    res.app_state.sess!.initUuid = this.svBase.getGuid();
    res.app_state.sess!.initTime = ((new Date()).getTime() / 1000).toString()
    const cdToken = res.app_state.sess!.cd_token;
    const userId = res.data.userData.userId
    svMenu.getMenu$('cdMenu', res.data.menuData)
      .subscribe((menu: any) => {
        // console.log('SessionService::setSess(res: any,svMenu: any)/menu:', menu);
        // event emitter to parent (shell)
        // this.emittMenu.emit(menu);

        const sub: any = {
          user_id: userId,
          sub_type_id: 7
        };
        this.pushRecepients.push(sub);
        // const pushEnvelop = {
        //   pushRecepients: this.pushRecepients,
        //   triggerEvent: 'login',
        //   emittEvent: 'push-menu',
        //   pushData: { m: menu, token: cdToken },
        //   req: this.setEnvelopeAuth(cdToken!),
        //   resp: res
        // };

        const pushEnvelop: ICdPushEnvelop = {
          pushData: {
            m: menu,
            pushRecepients: this.pushRecepients,
            triggerEvent: 'login',
            emittEvent: 'push-menu',
            token: cdToken!,
            initTime: null,
            relayTime: null,
            relayed: false,
            deliveryTime: null,
            deliverd: false,
          },
          req: this.setEnvelopeAuth(cdToken!),
          resp: res
        };

        // if data push is enabled at the server
        if (res.app_state.sConfig!.usePush) {
          this.pushData('send-menu', pushEnvelop);
        }

        // if polling is enabled at the server
        if (res.app_state.sConfig!.useCacheStore) {
          const cacheData = {
            key: this.svBase.cacheKey('User', 'User', 'Login', `${userId}`, cdToken!),
            value: JSON.stringify(pushEnvelop)
          }
          // this.setEnvelopeCacheCreate(cacheData, cdToken!);
          // console.log('saveToCache/this.postData:', JSON.stringify(this.postData));
          // const ret$ = this.svServer.proc(this.postData);
          // ret$.subscribe((ret) => {
          //   console.log('CacheResponse:', ret);
          // })

          this.svBase.cacheCreate$(cacheData, cdToken!)
            .subscribe((ret) => {
              console.log('core/User/SessService::CacheResponse:', ret);
            });


        }

        /**
         * emittEvent is null because the purpose is to
         * register user socket on successfull login.
         * At the time of this note, no broadcast event is set
         */
        //  const pushEnvelop: CdPushEnvelop = {
        //   pushRecepients: null,
        //   emittEvent: null,
        //   triggerEvent: 'login',
        //   req: null,
        //   resp: userDataResp
        // };
        // this.emitLogin(pushEnvelop);
      })

    svMenu.init(res);
    localStorage.setItem(cdToken!, JSON.stringify(res.app_state));
  }

  setEnvelopeCacheCreate(cacheData: CacheData, cdToken: string) {
    return {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'CdCache',
      a: 'Create',
      dat: {
        f_vals: [
          {
            data: cacheData
          }
        ],
        token: cdToken
      },
      args: null
    };
  }

  pushData(pushEvent: any, data: any) {
    switch (pushEvent) {
      case 'send-menu':
        this.svSocket.emit(pushEvent, data);
        break;
    }
  }

  setEnvelopeAuth(cdToken: string):ICdRequest {
    return {
      ctx: 'Sys',
      m: 'User',
      c: 'User',
      a: 'Login',
      dat: {
        f_vals: [
          {
            data: null
          }
        ],
        token: cdToken
      },
      args: null
    };
  }

  resetExprTime(ttl: any) {
    // console.log('starting resetExprTime(ttl)');
    const exprTime = moment().add(ttl, 'seconds');
    localStorage.setItem('ExprTime-' + this.token, exprTime.toString());
  }

  getExprTime(ttl: any) {
    // console.log('starting getExprTime(ttl)');
    const exprTime = moment().add(ttl, 'seconds');
    console.log(exprTime.toString());
    return moment().add(ttl, 'seconds').toString();
  }

  logout() {
    // console.log('starting logout()');
    this.killSess();
    // set gui to loged out state
    this.svAppState.setMode('login');
  }

  killSess() {
    // console.log('starting killSess()');
    localStorage.removeItem('sess-' + this.token);
    localStorage.removeItem('ExprTime-' + this.token);
    clearTimeout(this.countdown);
    this.killSessServer();
  }

  async killSessServer() {
    const data = {
      action: 'kill',
      dat: null
    }
    this.setSessPost(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData).subscribe((res) => {
      console.log(res);
    });

  }

  async renewSessServer() {
    const data = {
      action: 'renew',
      dat: null
    }
    this.setSessPost(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData).subscribe((res) => {
      console.log(res);
    });

  }

  setSessPost(data: any) {
    /*
    set post data
    */
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'SessionController',
      a: data.action,
      dat: data.dat,
      args: null
    };
  }

  public isLoggedIn() {
    // const ret = moment().isBefore(this.getExpiration());
    // return ret;
    return this.isActive;
  }

  isLoggedOut() {
    // console.log('starting isLoggedOut()');
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: string | null = localStorage.getItem('ExprTime');
    let ret: any = new Date();
    if (expiration) {
      ret = new Date(expiration);
    }
    return ret;
  }

  /**
   * localStorage.setItem('maxDistance', this.maxDistance);
    localStorage.setItem('sess', JSON.stringify(sess));
    localStorage.setItem('ExprTime', this.getExprTime(ttl));

   */
  getSessData(): any {
    // console.log('starting getSessData()');
    const expiration = localStorage.getItem('sess-' + this.token);
    let ret = {};
    if (expiration) {
      ret = JSON.parse(expiration);
    }
    return ret;
  }

  getCdToken() {
    // console.log('starting getCdToken()');
    return this.getSessData().cd_token;
  }

  getJWToken() {
    // console.log('starting getJWToken()');
    return this.getSessData().jwt;
  }

  getTtl() {
    // console.log('starting getTtl()');
    return this.getSessData().ttl;
  }

  /*
  Every time successfull response come from server, 
  it needs to update the client session to extend the Expiration time
  */
  renewSess(res: any, svMenu: any) {
    // console.log('starting renewSess(res)');
    this.setSess(res, svMenu);
  }

  // initComponent(params: any, iClient: any) {
  //   this.setCSess(params.token, iClient);
  //   const asStr = localStorage.getItem(iClient.token);
  //   if (asStr) {
  //     iClient.jAppState = JSON.parse(asStr);
  //     iClient.sess = iClient.jAppState.sess!;
  //     iClient.rowId = params.rowId;
  //     iClient.rowData = JSON.parse(params.rowData);
  //     iClient.fields = JSON.parse(params.fields);
  //     const nameField = iClient.fields.filter((f: any) => f.isNameField);
  //     iClient.title = nameField[0].title;
  //     iClient.initForms();
  //   } else {
  //     const params = {
  //       queryParams: { msg: 'You need to login with privileges to access' },
  //       skipLocationChange: true,
  //       replaceUrl: false
  //     };
  //     iClient.router.navigate(['/user/login'], params);
  //   }
  //   //});
  // }

  setCSess(token: string, iClient: any) {
    if ('token' in iClient) {
      iClient.token = token;
    }

    if ('baseModel' in iClient) {
      iClient.baseModel.token = token;
    }

  }

  getCSess(iClient: any) {
    return iClient.token;
  }

  countDown(endTime: any) {
    this.endTime = endTime;
    // Set the date we're counting down to
    // const countDownDate = new Date('Jan 5, 2021 15:37:25').getTime();
    this.countDownDate = new Date(endTime).getTime();

    // Update the count down every 1 second
    this.countdown = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      console.log('this.countDownDate:');
      console.log(this.countDownDate);
      console.log('now:');
      console.log(now);
      // Find the distance between now and the count down date
      this.distance = this.countDownDate - now;
      console.log('distance:');
      console.log(this.distance);

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      // document.getElementById('demo').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
      console.log(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ');

      // If the count down is finished, write some text
      if (this.distance < 0) {
        clearInterval(this.countdown);
        // document.getElementById('demo').innerHTML = 'EXPIRED';
        console.log('session expired');
        this.logout();
      }
      if (this.distance == this.maxDistance) {
        // let subRet;
        // this.subscription =
        //   fromEvent(document, 'mousemove')
        //     .subscribe( e => {
        //       // console.log(e);
        //       if (this.isLoggedIn()) {
        //         console.log('loggedin == ture')
        //         subRet = new Date(endTime).getTime();
        //         console.log('subRet>>');
        //         console.dir(subRet);
        //         this.countDownDate = subRet;
        //       }
        //     });


      }
    }, 4000);
  }

  resetCountDown() {
    clearTimeout(this.countdown);
    const ttl = this.getTtl;
    // this.resetExprTime(ttl);
    // this.distance += (Number(ttl) * 1000);
    this.countDown(ttl);
  }

  setModulesData() {
    console.log('starting fetchModules()');
    // this.svServer.setParams({
    //   ctx: 'Sys',
    //   m: 'Moduleman',
    //   c: 'ModulesController',
    //   a: 'actionGetMenu',
    //   dat: {
    //     token: this.token
    //     // token: 'i02I0phd2T0Z6UIfuvv417aL3jis5RoMKq81mBKe'
    //   },
    //   args: {}
    // });
    // // console.log('token>>', this.svServer.token);
    // this.svServer.proc(this.svServer.params)

    //   .pipe(
    //     // extract data (addOn modules) from response
    //     map((resp: any) => { return resp.data; }),

    //     // combine the native sysModules and addOn modules
    //     map(addOns => this.getSysModules().concat(addOns)),

    //     // filter only enabled modules
    //     map(modules => modules.filter(Module => Module['registered'] == true))

    //     /**
    //      * ToDo: sorting compostition needed here
    //      * The sorting should be done against 'order' field.
    //      */
    //   )

    //   // eventually subscribe...
    //   .subscribe(
    //     (enabledModules: any) => {
    //       console.log('setModulesData/dat:', enabledModules);
    //       this.activeModules$ = enabledModules;
    //     }
    //   );
  }

  getSysModules() {
    const modules = [{
      menuOrder: 11,
      path: './dashboard',
      moduleTypeID: 1,
      description: 'dashboard',
      registered: false,
      label: 'Home',
      icon: 'home',
      children: [{
        path: 'dashboard',
        label: 'dashboard'
      }, {
        path: 'styles',
        label: 'styles'
      }, {
        path: 'messages',
        label: 'messages'
      }, {
        path: 'reservation',
        label: 'reservation'
      }, {
        path: 'calendar1',
        label: 'calendar1'
      }, {
        path: 'calendar2',
        label: 'calendar2'
      }]
    }, {
      menuOrder: 11,
      path: './admin',
      moduleTypeID: 1,
      description: 'admin',
      registered: false,
      label: 'admin',
      icon: 'cog',
      children: [{
        path: 'admin/admin-dashboard',
        label: 'dashboard'
      }, {
        path: 'admin/cdobj',
        label: 'cdobj'
      }, {
        path: 'admin/company',
        label: 'company'
      }, {
        path: 'admin/grus',
        label: 'groups & users'
      }, {
        path: 'admin/menu',
        label: 'menu'
      }, {
        path: 'admin/modman',
        label: 'modman'
      }]
    }, {
      menuOrder: 11,
      path: 'stats',
      moduleTypeID: 1,
      description: 'stats',
      registered: false,
      label: 'stats',
      icon: 'cog',
      children: [{
        path: 'stats/xy',
        label: 'xy-chart'
      }, {
        path: 'stats/pie',
        label: 'pie'
      }, {
        path: 'stats/micro-chart',
        label: 'micro-chart'
      }]
    }, {
      menuOrder: 12,
      path: 'coop',
      moduleTypeID: 1,
      description: 'coop module',
      registered: false,
      label: 'coop',
      icon: 'cog',
      children: [{
        path: 'coop/index',
        label: 'home'
      }, {
        path: 'coop/directory',
        label: 'directory'
      }]
    }, {
      menuOrder: 11,
      path: 'booking',
      moduleTypeID: 1,
      description: 'booking',
      registered: false,
      label: 'booking',
      icon: 'cog',
      children: [{
        path: 'booking/directory',
        label: 'directory'
      },
      {
        path: 'booking/reservation',
        label: 'reservation'
      }]
    }, {
      menuOrder: 11,
      path: './modtst',
      moduleTypeID: 1,
      description: 'modtst',
      registered: false,
      label: 'modtst',
      icon: 'cog',
      children: [{
        path: 'modtst/index',
        label: 'home'
      },
      {
        path: 'modtst/dashboard',
        label: 'dashboard'
      }]
    }];
    return modules;
  }

}
