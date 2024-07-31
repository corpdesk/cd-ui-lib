import { Inject, Injectable } from '@angular/core';
import { 
    BaseService, ServerService, IQuery, ICdRequest, EnvConfig,
    DEFAULT_ENVELOPE_CREATE, DEFAULT_ENVELOPE_GET, DEFAULT_ENVELOPE_GET_PAGED, 
    DEFAULT_ENVELOPE_GET_TYPE,DEFAULT_ENVELOPE_UPDATE, DEFAULT_ENVELOPE_DELETE 
} from '../base';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    postData: ICdRequest;
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
  createCompany$(newCompany: any, cdToken: string) {
    console.log('starting createCompany$()/01:')
    this.setEnvelopeCreateCompany(newCompany, cdToken);
    console.log('createCompany$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.setEnvelopeCreateCompany(newCompany, cdToken));
  }

  setEnvelopeCreateCompany(d: any, cdToken: string) {
    console.log('starting setEnvelopeCreateCompany()/01:')
    console.log('starting setEnvelopeCreateCompany()/d:', d)
    console.log('starting setEnvelopeCreateCompany()/d.data:', d.data)
    return {
      ctx: d.ctx,
      m: 'Moduleman',
      c: 'Company',
      a: 'Create',
      dat: {
        f_vals: [
          {
            data: d.data
          }
        ],
        token: cdToken
      },
      args: {}
    };
  }

  getCompany(q: IQuery, cdToken: string) {
    this.setEnvelopeCompany(q, cdToken);
    console.log('getCompany()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getCompany$(q: IQuery, cdToken: string) {
    console.log('CompanyService::getCompany$()/q:', q)
    this.setEnvelopeCompany(q, cdToken);
    console.log('CompanyService::getCompany$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getCompanyType$(q: IQuery, cdToken: string) {
    this.setEnvelopeCompanyType(q, cdToken);
    console.log('getCompany$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeCompany(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Company',
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

  setEnvelopeCompanyType(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Company',
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

  updateCompany$(q: IQuery, cdToken: string) {
    this.setEnvelopeUpdate(q, cdToken);
    console.log('updateCompany$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUpdate(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Company',
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

  deleteCompany$(q: IQuery, cdToken: string) {
    this.setEnvelopeDelete(q, cdToken);
    console.log('deleteCompany$()/this.postData:', JSON.stringify(this.postData))
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
