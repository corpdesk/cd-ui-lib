import { Injectable } from '@angular/core';
import { ServerService, IQuery } from '@corpdesk/core/src/lib/base';
import { CdRequest } from '@corpdesk/core/src/lib/base';

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
}
