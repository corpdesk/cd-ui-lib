import { Injectable, Inject } from '@angular/core';
import { AWizardStep, DdlData, FieldInfo } from '../guig';
import { ServerService, IQuery, CdRequest, ICdResponse, EnvConfig, ICdPushEnvelop } from '../base';
import { DdlCtx } from '../guig';
import { NotificationService } from '../comm';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {

  ddlData: DdlData = {
    config: { suppressScrollX: true, wheelSpeed: 0.3 },
    header: {
      title: { lable: 'Notifications', cls: '', action: null },
      sideLink: { lable: 'View All', cls: '', action: null },
    },
    footer: { label: 'View All', icon: '', action: null },
    data: [
      {
        label: 'item 1',
        description: 'If several languages coalesce the grammar',
        time: '3 min ago',
        // iconId: '',
        // iconName: '',
        // action: null,
        // attributes: {
        //   id: 'atlassian',
        //   membership: {
        //     free: ['brands'],
        //     pro: ['brands']
        //   },
        //   styles: ['brands'],
        //   unicode: 'f77b',
        //   voted: true
        // },
        // id: 'atlassian',
        // links: {
        //   self: '/api/icons/atlassian'
        // },
        // type: 'icon'
      },
      {
        label: 'item 2',
        description: 'It will seem like simplified English',
        time: '1 hr ago'
      },
      {
        label: 'item 3',
        description: 'If several languages coalesce the grammar',
        time: '4 hr ago'
      }
    ]
  }

  // {
  //     appId?: string;
  //     appSockets?: ISocketItem[];
  //     pushGuid: string;
  //     m?: any;
  //     pushRecepients: ICommConversationSub[];
  //     triggerEvent: string;
  //     emittEvent: string;
  //     token: string;
  //     commTrack: CommTrack;
  //     isNotification: boolean | null;
  //     isAppInit?: boolean | null;
  // }
  pushEnvelop: ICdPushEnvelop = {
    pushData: {
      appId: '',
      appSockets: [],
      pushGuid: '',
      m: null,
      pushRecepients: [],
      triggerEvent: '',
      emittEvent: '',
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

  numericNumberReg1 = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  numericNumberReg2 = '/^[0-9]\d*$/';
  numericNumberReg3 = new RegExp(/^-?[0-9]\\d*(\\.\\d{1,2})?$/, 'i')
  numericNumberReg4 = new RegExp(/^[0-9]\d*$/, 'i')

  postData: CdRequest;
  constructor(
    private svServer: ServerService,
    private svNotif: NotificationService,
    @Inject('env') private env: EnvConfig,
  ) { }

  /**
   * 
   * @param newModule 
   * {
        "ctx": "Sys",
        "m": "Moduleman",
        "c": "Module",
        "a": "Create",
        "dat": {
            "f_vals": [
                {
                    "data": {
                        "moduleName": "xxx30102021",
                        "isSysModule": false
                    }
                }
            ],
            "token": "3ffd785f-e885-4d37-addf-0e24379af338"
        },
        "args": {}
    }
   */
  createModule$(newModule: any, cdToken: string) {
    // console.log('cd-ui-lib/ModuleService::createModule$()/newModule:', newModule)
    this.setEnvelopeCreateModule(newModule, cdToken);
    // console.log('createModule$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeCreateModule(newModule: any, cdToken: string) {
    // console.log('cd-ui-lib/ModuleService::setEnvelopeCreateModule()/data:', newModule)
    this.postData = {
      ctx: newModule.ctx,
      m: 'Moduleman',
      c: 'Module',
      a: 'Create',
      dat: {
        f_vals: [
          {
            data: newModule.data
          }
        ],
        token: cdToken
      },
      args: {}
    };
  }

  getModules(q: IQuery, cdToken: string) {
    this.setEnvelopeModule(q, cdToken);
    // console.log('getModules()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getModule$(q: IQuery, cdToken: string) {
    this.setEnvelopeModule(q, cdToken);
    // console.log('getModules$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeModule(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Module',
      a: 'GetCount',
      dat: {
        f_vals: [
          {
            query: q
          }
        ],
        token: cdToken
      },
      args: {}
    };
  }

  updateModule$(q: IQuery, cdToken: string) {
    this.setEnvelopeUpdate(q, cdToken);
    // console.log('updateModules$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUpdate(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Module',
      a: 'Update',
      dat: {
        f_vals: [
          {
            query: q
          }
        ],
        token: cdToken
      },
      args: {}
    };
  }

  deleteModules$(q: IQuery, cdToken: string) {
    this.setEnvelopeDelete(q, cdToken);
    // console.log('deleteModules$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeDelete(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Module',
      a: 'Delete',
      dat: {
        f_vals: [
          {
            query: q
          }
        ],
        token: cdToken
      },
      args: {}
    };
  }

  setIconsData$(step: AWizardStep, controlName: string) {
    step.fields.map((f: FieldInfo, i: number) => {
      if (f.name === controlName) {
        step.fields[i].ddlInfo!.selData$ = of(this.ddlData);
        step.fields[i].ddlInfo!.selIndex = 'iconId';
        step.fields[i].ddlInfo!.selValueField = 'iconName';
        step.fields[i].ddlInfo!.selPlaceholder = '...Choose';
      }
    })
  }

  setDdl$(ddlCtx: DdlCtx): Observable<any> {
    if (ddlCtx.token) {
      const subject = new Subject<any>();
      let ret: any = [];
      ddlCtx.getFn$!
        .subscribe((r: any) => {
          const response: ICdResponse = r;
          console.log('ModulemanService::setDdl$()/response:', response)
          console.log('ModulemanService::setDdl$()/ddlCtx.step.fields:', ddlCtx.step)
          if (response.app_state.success) {
            ret = response.data.items;
            ddlCtx.step!.fields.map((f: FieldInfo, i: number) => {
              console.log('ModulemanService::setDdl$()/f.name1:', f.name)
              console.log('ModulemanService::setDdl$()/ddlCtx.controlName:', ddlCtx.controlName)
              console.log('ModulemanService::setDdl$()/f:', f)
              if (f.name === ddlCtx.controlName && 'ddlInfo' in f) {
                console.log('ModulemanService::setDdl$()/f.name2:', f.name)
                ddlCtx.step!.fields[i].ddlInfo!.selData$! = of(response.data.items);
                ddlCtx.step!.fields[i].ddlInfo!.selIndex = ddlCtx.selIndex;
                ddlCtx.step!.fields[i].ddlInfo!.selValueField = ddlCtx.selValueField;
                ddlCtx.step!.fields[i].ddlInfo!.selPlaceholder = '...Choose';
              }
            })
            subject.next(ret);
          } else {
            // this.pushEnvelop.pushData = response;
            this.pushEnvelop.resp = response;
            this.svNotif.emitNotif(this.pushEnvelop);
            subject.next(ret);
          }
        })
      return subject.asObservable();
    } else {
      return of([]);
    }

  }
}
