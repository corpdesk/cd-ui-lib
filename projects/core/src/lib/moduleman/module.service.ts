import { Injectable } from '@angular/core';
import { ServerService, IQuery, CdRequest } from '@corpdesk/core/src/lib/base';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  postData: CdRequest;
  constructor(
    private svServer: ServerService
  ) { }

  getModules(q: IQuery, cdToken: string) {
    this.setEnvelopeModules(q, cdToken);
    console.log('getModules()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getModules$(q: IQuery, cdToken: string) {
    this.setEnvelopeModules(q, cdToken);
    console.log('getModules$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeModules(q: IQuery, cdToken: string) {
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

  updateModules$(q: IQuery, cdToken: string) {
    this.setEnvelopeUpdate(q, cdToken);
    console.log('getModules()/this.postData:', JSON.stringify(this.postData))
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
}
