import { Injectable, Inject } from '@angular/core';
import { ServerService, IQuery, CdRequest, ICdResponse, EnvConfig } from '@corpdesk/core/src/lib/base';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  postData: CdRequest;
  constructor(
    private svServer: ServerService,
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
}
