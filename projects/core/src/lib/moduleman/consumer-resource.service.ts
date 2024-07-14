import { Inject, Injectable } from '@angular/core';
import { 
    BaseService, ServerService, IQuery, ICdRequest, EnvConfig,
    DEFAULT_ENVELOPE_CREATE, DEFAULT_ENVELOPE_GET, DEFAULT_ENVELOPE_GET_PAGED, 
    DEFAULT_ENVELOPE_GET_TYPE,DEFAULT_ENVELOPE_UPDATE, DEFAULT_ENVELOPE_DELETE 
} from '@corpdesk/core/src/lib/base';

@Injectable({
    providedIn: 'root',
})
export class ConsumerResourceService {
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
  createConsumerResource$(newConsumerResource: any, cdToken: string) {
    console.log('starting createConsumerResource$()/01:')
    this.setEnvelopeCreateConsumerResource(newConsumerResource, cdToken);
    console.log('createConsumerResource$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.setEnvelopeCreateConsumerResource(newConsumerResource, cdToken));
  }

  setEnvelopeCreateConsumerResource(d: any, cdToken: string) {
    console.log('starting setEnvelopeCreateConsumerResource()/01:')
    console.log('starting setEnvelopeCreateConsumerResource()/d:', d)
    console.log('starting setEnvelopeCreateConsumerResource()/d.data:', d.data)
    return {
      ctx: d.ctx,
      m: 'Moduleman',
      c: 'ConsumerResource',
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

  getConsumerResource(q: IQuery, cdToken: string) {
    this.setEnvelopeConsumerResource(q, cdToken);
    console.log('getConsumerResource()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getConsumerResource$(q: IQuery, cdToken: string) {
    console.log('ConsumerResourceService::getConsumerResource$()/q:', q)
    this.setEnvelopeConsumerResource(q, cdToken);
    console.log('ConsumerResourceService::getConsumerResource$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getConsumerResourceType$(q: IQuery, cdToken: string) {
    this.setEnvelopeConsumerResourceType(q, cdToken);
    console.log('getConsumerResource$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeConsumerResource(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerResource',
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

  setEnvelopeConsumerResourceType(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerResource',
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

  updateConsumerResource$(q: IQuery, cdToken: string) {
    this.setEnvelopeUpdate(q, cdToken);
    console.log('updateConsumerResource$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUpdate(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerResource',
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

  deleteConsumerResource$(q: IQuery, cdToken: string) {
    this.setEnvelopeDelete(q, cdToken);
    console.log('deleteConsumerResource$()/this.postData:', JSON.stringify(this.postData))
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
