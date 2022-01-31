import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ServerService } from './server.service';
import { DEFAULT_ENVELOPE_CREATE, DEFAULT_ENVELOPE_DELETE, DEFAULT_ENVELOPE_GET, DEFAULT_ENVELOPE_GET_PAGED, DEFAULT_ENVELOPE_GET_TYPE, DEFAULT_ENVELOPE_UPDATE, ICdRequest, IQuery } from './IBase';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
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
}
