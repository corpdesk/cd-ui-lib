import { Inject, Injectable } from '@angular/core';
import { 
    BaseService, ServerService, IQuery, ICdRequest, EnvConfig,
    DEFAULT_ENVELOPE_CREATE, DEFAULT_ENVELOPE_GET, DEFAULT_ENVELOPE_GET_PAGED, 
    DEFAULT_ENVELOPE_GET_TYPE,DEFAULT_ENVELOPE_UPDATE, DEFAULT_ENVELOPE_DELETE 
} from '../base';

@Injectable({
    providedIn: 'root',
})
export class ConsumerService {
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
  createConsumer$(newConsumer: any, cdToken: string) {
    console.log('starting createConsumer$()/01:')
    this.setEnvelopeCreateConsumer(newConsumer, cdToken);
    console.log('createConsumer$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.setEnvelopeCreateConsumer(newConsumer, cdToken));
  }

  setEnvelopeCreateConsumer(d: any, cdToken: string) {
    console.log('starting setEnvelopeCreateConsumer()/01:')
    console.log('starting setEnvelopeCreateConsumer()/d:', d)
    console.log('starting setEnvelopeCreateConsumer()/d.data:', d.data)
    return {
      ctx: d.ctx,
      m: 'Moduleman',
      c: 'Consumer',
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

  getConsumer(q: IQuery, cdToken: string) {
    this.setEnvelopeConsumer(q, cdToken);
    console.log('getConsumer()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getConsumer$(q: IQuery, cdToken: string) {
    console.log('ConsumerService::getConsumer$()/q:', q)
    this.setEnvelopeConsumer(q, cdToken);
    console.log('ConsumerService::getConsumer$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getConsumerType$(q: IQuery, cdToken: string) {
    this.setEnvelopeConsumerType(q, cdToken);
    console.log('getConsumer$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeConsumer(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Consumer',
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

  setEnvelopeConsumerType(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Consumer',
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

  updateConsumer$(q: IQuery, cdToken: string) {
    this.setEnvelopeUpdate(q, cdToken);
    console.log('updateConsumer$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUpdate(q: IQuery, cdToken: string) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'Consumer',
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

  deleteConsumer$(q: IQuery, cdToken: string) {
    this.setEnvelopeDelete(q, cdToken);
    console.log('deleteConsumer$()/this.postData:', JSON.stringify(this.postData))
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
