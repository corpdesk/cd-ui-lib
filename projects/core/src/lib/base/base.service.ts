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
  setEnvelope(defaultEnvelope: ICdRequest, q: IQuery, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::setEnvelope$()/q:', q)
    console.log('BaseService::setEnvelope$()/cdToken:', cdToken)
    this.postData = defaultEnvelope;
    this.initEnvelope(ctx, module, controller);
    this.postData.dat.f_vals[0].query = q;
    this.postData.dat.token = cdToken;
    console.log('BaseService::setEnvelope$()/this.postData:', this.postData)
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

  create$(q: any, cdToken: string, ctx: string | null = null, module: string | null = null, controller: string | null = null) {
    console.log('BaseService::create$()/this.module:', this.module)
    console.log('BaseService::create$()/this.controller:', this.controller)
    this.setEnvelope(DEFAULT_ENVELOPE_CREATE, q, cdToken);
    console.log('create$()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
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
    console.log('starting BaseService::searchLocalStorage()/lcLength:');
    // const lc = { ...localStorage };
    const lcArr = [];

    const lcLength = localStorage.length;
    console.log('BaseService::searchLocalStorage()/lcLength:', lcLength);
    let i = 0;
    for (let i = 0; i < localStorage.length; i++) {
      // try {
      // set iteration key name
      const k = localStorage.key(i);
      // use key name to retrieve the corresponding value
      var v = localStorage.getItem(k!);
      // console.log the iteration key and value
      console.log('Key: ' + k + ', Value: ' + v);
      try {
        console.log('BaseService::searchLocalStorage()/1')
        if (typeof (v) === 'object') {
          console.log('BaseService::searchLocalStorage()/2')
          console.log('BaseService::searchLocalStorage()/v:', v)
          const lcItem = JSON.parse(v!);
          if ('success' in lcItem) {
            console.log('BaseService::searchLocalStorage()/3')
            const appState: IAppState = lcItem;
            console.log('BaseService::searchLocalStorage()/appState:', appState)
          }
          if ('resourceGuid' in lcItem) {
            console.log('BaseService::searchLocalStorage()/4')
            const cdObjId = lcItem;
            console.log('BaseService::searchLocalStorage()/cdObjId:', cdObjId)
          }
          console.log('BaseService::searchLocalStorage()/5')
          lcArr.push({ key: k, value: JSON.parse(v!) })
        } else {
          console.log('BaseService::searchLocalStorage()/typeof (v):', typeof (v))
          console.log('BaseService::searchLocalStorage()/6')
          lcArr.push({ key: k, value: JSON.parse(v) })
        }

      } catch (e) {
        console.log('offending item:', v);
        console.log('the item is not an object');
        console.log('Error:', e);
      }

    }
    console.log('BaseService::searchLocalStorage()/lcArr:', lcArr);
    console.log('BaseService::searchLocalStorage()/f.cdObjId!.resourceName:', f.cdObjId!.resourceName);
    // isAppState
    // const resourceName = 'UserModule';
    const AppStateItems = (d: any) => 'success' in d.value;
    const isObject = (d: any) => typeof (d.value) === 'object';
    const CdObjIdItems = (d: any) => 'resourceName' in d.value;
    const filtObjName = (d: any) => d.value.resourceName === f.cdObjId!.resourceName && d.value.ngModule === f.cdObjId!.ngModule;
    const latestItem = (prev: any, current: any) => (prev.value.commTrack.initTime > current.value.commTrack.initTime) ? prev : current;
    let ret: any = null;
    try {
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
        .reduce(latestItem!)
      console.log('BaseService::searchLocalStorage()/ret:', ret);
    } catch (e) {
      console.log('Error:', e);
    }
    return ret;
  }
}
