import { Injectable, Inject } from '@angular/core';
import { ServerService, IQuery, CdRequest, ICdResponse, EnvConfig } from '../base';

@Injectable({
  providedIn: 'root',
})
export class CdObjService {
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
  createCdObj$(newCdObj: any, cdToken: string) {
    this.setEnvelopeCreateModule(newCdObj, cdToken);
    console.log('createCdObj$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeCreateModule(data: any, cdToken: string) {
    this.postData = {
      ctx: data.ctx,
      m: 'Moduleman',
      c: 'CdObj',
      a: 'Create',
      dat: {
        f_vals: [
          {
            data: data.savables
          }
        ],
        token: cdToken
      },
      args: {}
    };
  }

  getCdObj(q: IQuery, cdToken: string) {
    this.setEnvelopeCdObj(q, cdToken);
    console.log('getCdObj()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getCdObj$(q: IQuery, cdToken: string) {
    console.log('CdObjService::getCdObj$()/q:', q)
    this.setEnvelopeCdObj(q, cdToken);
    console.log('CdObjService::getCdObj$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getCdObjType$(q: IQuery, cdToken: string) {
    this.setEnvelopeCdObjType(q, cdToken);
    console.log('getCdObj$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeCdObj(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'CdObj',
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

  setEnvelopeCdObjType(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'CdObj',
      a: 'GetType',
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

  updateCdObj$(q: IQuery, cdToken: string) {
    this.setEnvelopeUpdate(q, cdToken);
    console.log('updateCdObj$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUpdate(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'CdObj',
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

  deleteCdObj$(q: IQuery, cdToken: string) {
    this.setEnvelopeDelete(q, cdToken);
    console.log('deleteCdObj$()/this.postData:', JSON.stringify(this.postData))
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
