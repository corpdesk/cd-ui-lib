import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ServerService } from './server.service';
import {
  DEFAULT_ENVELOPE_CREATE, DEFAULT_ENVELOPE_DELETE,
  DEFAULT_ENVELOPE_GET, DEFAULT_ENVELOPE_GET_PAGED, DEFAULT_ENVELOPE_GET_TYPE,
  DEFAULT_ENVELOPE_UPDATE, ICdRequest, IQuery,
  LsFilter, IAppState, CdObjId
} from './IBase';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  debug = false;
  postData: ICdRequest;
  module = '';
  controller = '';

  constructor(
    private svServer: ServerService
  ) {

  }

  /**
   * module and controller are filled in by default from the client...but there
   * are circumstances where you will need to override
   * @param defaultEnvelope 
   * @param q 
   * @param cdToken 
   * @param module 
   * @param controller 
   */
  setEnvelope(defaultEnvelope: ICdRequest, q: any, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::setEnvelope$()/q:', q)
    console.log('BaseService::setEnvelope$()/cdToken:', cdToken)
    this.postData = defaultEnvelope;
    this.initEnvelope(ctx, module, controller);
    this.postData.dat.token = cdToken;
    if(defaultEnvelope.a === "Create"){
      console.log('BaseService::setEnvelope$()/action=Create')
      delete this.postData.dat.f_vals[0].query;
      this.postData.dat.f_vals[0].data = q;
      console.log('BaseService::setEnvelope$()/this.postData1:', this.postData)
    } else {
      console.log('BaseService::setEnvelope$()/action ISNOT Create')
      delete this.postData.dat.f_vals[0].data;
      this.postData.dat.f_vals[0].query = q;
    }
    
    console.log('BaseService::setEnvelope$()/this.postData2:', this.postData)
  }

  getEnvelope(defaultEnvelope: ICdRequest, q: any, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::getEnvelope$()/q:', q)
    console.log('BaseService::getEnvelope$()/cdToken:', cdToken)
    let postData = defaultEnvelope;
    this.initEnvelope(ctx, module, controller);
    if(defaultEnvelope.a === "Create"){
      console.log('BaseService::getEnvelope$()/action=Create')
      postData.dat.f_vals[0].data = q;
      console.log('BaseService::getEnvelope$()/postData1:', postData)
    } else {
      console.log('BaseService::getEnvelope$()/action ISNOT Create')
      postData.dat.f_vals[0].query = q;
    }
    
    postData.dat.token = cdToken;
    console.log('BaseService::getEnvelope$()/postData2:', postData)
    return postData
  }

  initEnvelope(ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    if (ctx) {
      this.postData.ctx = ctx;
    }
    if (module) {
      this.postData.m = module;
    } else {
      this.postData.m = this.module;
    }
    if (controller) {
      this.postData.c = controller;
    } else {
      this.postData.c = this.controller;
    }
  }

  create$(data: any, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::create$()/this.module:', this.module)
    console.log('BaseService::create$()/this.controller:', this.controller)
    console.log('BaseService::create$()/data:', data)
    // this.setEnvelope(DEFAULT_ENVELOPE_CREATE, data, cdToken);
    // console.log('BaseService::create$()/this.postData:', JSON.stringify(this.postData))
    this.initEnvelope(ctx, module, controller);
    DEFAULT_ENVELOPE_CREATE.dat.f_vals[0].data = data
    DEFAULT_ENVELOPE_CREATE.dat.token = cdToken;
    // return this.svServer.proc(this.getEnvelope(DEFAULT_ENVELOPE_CREATE, data, cdToken));
    console.log('BaseService::create$()/DEFAULT_ENVELOPE_CREATE:', DEFAULT_ENVELOPE_CREATE)
    return this.svServer.proc(DEFAULT_ENVELOPE_CREATE);
  }

  get$(q: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    this.setEnvelope(DEFAULT_ENVELOPE_GET, q, cdToken, ctx, module, controller);
    console.log('get$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getPaged$(q: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::getPaged$()/q:', q)
    console.log('BaseService::getPaged$()/cdToken:', cdToken)
    this.setEnvelope(DEFAULT_ENVELOPE_GET_PAGED, q, cdToken, ctx, module, controller);
    console.log('get$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  // getCdObj$(q: IQuery, cdToken: string) {
  //   console.log('CdObjService::getCdObj$()/q:', q)
  //   this.setEnvelopeCdObj(q, cdToken);
  //   console.log('CdObjService::getCdObj$()/this.postData:', JSON.stringify(this.postData))
  //   return this.svServer.proc(this.postData);
  // }

  getType$(q: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    this.setEnvelope(DEFAULT_ENVELOPE_GET_TYPE, q, cdToken, ctx, module, controller);
    console.log('get$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  update$(q: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    this.setEnvelope(DEFAULT_ENVELOPE_UPDATE, q, cdToken, ctx, module, controller);
    console.log('update$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  delete$(q: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    this.setEnvelope(DEFAULT_ENVELOPE_DELETE, q, cdToken, ctx, module, controller);
    console.log('delete$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  getGuid() {
    return uuidv4();
  }

  cacheKey(m: string, c: string, a: string, userId: string, cdToken: string) {
    return `${m}_${c}_${a}_${cdToken}_${userId}`;
  }

  setEnvelopeCache(defaultEnvelope: ICdRequest, d: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::setEnvelope$()/d:', d)
    console.log('BaseService::setEnvelope$()/cdToken:', cdToken)
    this.postData = defaultEnvelope;
    this.initEnvelope(ctx, module, controller);
    this.postData.dat.f_vals[0].data = d;
    this.postData.dat.token = cdToken;
    console.log('BaseService::setEnvelopeCache()/this.postData:', this.postData)
  }

  cacheCreate$(d: any, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    this.module = 'Moduleman';
    this.controller = 'CdCache';
    console.log('BaseService::cacheCreate$()/this.controller:', this.controller)
    this.setEnvelopeCache(DEFAULT_ENVELOPE_CREATE, d, cdToken);
    console.log('cacheCreate$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  searchLocalStorage(f: LsFilter) {
    console.log('starting BaseService::searchLocalStorage()/01');
    // const lc = { ...localStorage };
    const lcArr = [];

    const lcLength = localStorage.length;
    // console.log('BaseService::searchLocalStorage()/lcLength:', lcLength);



    /**
     * Safely parses a JSON string.
     * @param {string} str - The JSON string to parse.
     * @returns {object|null} - The parsed object, or null if parsing fails.
     */
    function safeJsonParse(str: string) {
      console.log('starting BaseService::searchLocalStorage()/safeJsonParse()/01');
      try {
        console.log('BaseService::searchLocalStorage()/safeJsonParse()/02');
        return JSON.parse(str);
      } catch (e: any) {
        console.log('BaseService::searchLocalStorage()/safeJsonParse()/03');
        console.error('JSON parsing error:', e.message);
        console.error('Invalid JSON string:', str);
        return null;
      }
    }
    let i = 0;
    for (let i = 0; i < localStorage.length; i++) {
      console.log('BaseService::searchLocalStorage()/02');
      // try {
      // set iteration key name
      const k = localStorage.key(i);
      // use key name to retrieve the corresponding value
      var v = localStorage.getItem(k!);
      // console.log the iteration key and value
      // console.log('Key: ' + k + ', Value: ' + v);
      try {
        console.log('BaseService::searchLocalStorage()/03');
        if (typeof (v) === 'object') {
          console.log('BaseService::searchLocalStorage()/04')
          console.log('BaseService::searchLocalStorage()/v:', v)
          const parsedValue = safeJsonParse(v!);
          const lcItem = JSON.parse(parsedValue!);
          console.log('BaseService::searchLocalStorage()/lcItem:', lcItem)
          if ('success' in lcItem) {
            console.log('BaseService::searchLocalStorage()/05')
            const appState: IAppState = lcItem;
            console.log('BaseService::searchLocalStorage()/appState:', appState)
          }
          if ('resourceGuid' in lcItem) {
            console.log('BaseService::searchLocalStorage()/06')
            const cdObjId = lcItem;
            // console.log('BaseService::searchLocalStorage()/cdObjId:', cdObjId)
          }
          console.log('BaseService::searchLocalStorage()/07')
          lcArr.push({ key: k, value: JSON.parse(v!) })
        } else {
          console.log('BaseService::searchLocalStorage()/v:', v)
          console.log('BaseService::searchLocalStorage()/typeof (v):', typeof (v))
          console.log('BaseService::searchLocalStorage()/08')
          const parsedValue = safeJsonParse(v);
          lcArr.push({ key: k, value: parsedValue })
        }

      } catch (e) {
        console.log('BaseService::searchLocalStorage()/09');
        console.log('offending item:', v);
        console.log('the item is not an object');
        console.log('Error:', e);
      }

    }
    console.log('BaseService::searchLocalStorage()/10');
    console.log('BaseService::searchLocalStorage()/lcArr:', lcArr);
    // console.log('BaseService::searchLocalStorage()/f.cdObjId!.resourceName:', f.cdObjId!.resourceName);
    // isAppState
    // const resourceName = 'UserModule';
    const AppStateItems = (d: any) => {
      console.log('BaseService::searchLocalStorage()/101');
      console.log('BaseService::searchLocalStorage()/d.value:', d.value);
      return 'success' in d.value
    };
    const isObject = (d: any) => {
      console.log('BaseService::searchLocalStorage()/102');
      console.log('BaseService::searchLocalStorage()/d:', d);
      return typeof (d.value) === 'object'
    };
    const CdObjIdItems = (d: any) => {
      console.log('BaseService::searchLocalStorage()/103');
      console.log('BaseService::searchLocalStorage()/d:', d);
      if(d.value){
        return 'resourceName' in d.value
      } else {
        return null
      }
      
    };
    const filtObjName = (d: any) => {
      console.log('BaseService::searchLocalStorage()/104');
      console.log('BaseService::searchLocalStorage()/d:', d);
      console.log('BaseService::searchLocalStorage()/f:', f);
      const ret = d.value.resourceName === f.cdObjId!.resourceName && d.value.ngModule === f.cdObjId!.ngModule;
      console.log('BaseService::searchLocalStorage()/ret:', ret);
      if(ret){
        return ret;
      } else{
        return 
      }
      
    }
    const latestItem = (prev: any, current: any) => {
      console.log('BaseService::searchLocalStorage()/105');
      console.log('BaseService::searchLocalStorage()/prev:', prev);
      console.log('BaseService::searchLocalStorage()/current:', current);
      return (prev.value.commTrack.initTime > current.value.commTrack.initTime) ? prev : current;
    }
    let ret: any = null;
    try {
      console.log('BaseService::searchLocalStorage()/11');
      // ret = lcArr
      //   .filter((d: any) => {
      //     if (typeof (d.value) === 'object') {
      //       console.log('BaseService::searchLocalStorage()/filteredByObject: d:', d);
      //       return d
      //     } else {
      //       return null;
      //     }
      //   })
      //   .filter((d: any) => {
      //     if ('resourceName' in d.value) {
      //       console.log('BaseService::searchLocalStorage()/filteredByResourceNameField: d:', d);
      //       return d;
      //     } else {
      //       return null;
      //     }
      //   })
      //   .filter((d: any) => {
      //     console.log('BaseService::searchLocalStorage()/filteredByName: d:', d);
      //     console.log('BaseService::searchLocalStorage()/filteredByName: d.value.resourceName:', d.value.resourceName);
      //     console.log('BaseService::searchLocalStorage()/filteredByName: f.cdObjId!.resourceName:', f.cdObjId!.resourceName);
      //     console.log('BaseService::searchLocalStorage()/filteredByName: d.value.ngModule:', d.value.ngModule);
      //     console.log('BaseService::searchLocalStorage()/filteredByName: f.cdObjId!.ngModule:', f.cdObjId!.ngModule);
      //     if (d.value.resourceName === f.cdObjId!.resourceName && d.value.ngModule === f.cdObjId!.ngModule) {
      //       return d;
      //     } else {
      //       return null;
      //     }
      //   })
      //   .reduce(
      //     (prev={}, current={}) => {
      //       console.log('BaseService::searchLocalStorage()/prev:', prev);
      //       console.log('BaseService::searchLocalStorage()/current:', current);
      //       return (prev.value.commTrack.initTime > current.value.commTrack.initTime) ? prev : current;
      //     }
      //   );
      ret = lcArr
        .filter(isObject)
        .filter(CdObjIdItems!)
        .filter(filtObjName!)
      console.log('BaseService::searchLocalStorage()/ret1:', ret);
      if(ret.length > 0){
        console.log('BaseService::searchLocalStorage()/ret2:', ret);
        ret = ret
        .reduce(latestItem!)
      }
      console.log('BaseService::searchLocalStorage()/ret3:', ret);
    } catch (e) {
      console.log('BaseService::searchLocalStorage()/12');
      console.log('Error:', e);
    }
    return ret;
  }
}
