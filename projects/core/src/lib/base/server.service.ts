import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { CdRequest, EnvConfig } from './IBase';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  options: any;
  resp: Observable<ArrayBuffer> = new Observable<ArrayBuffer>();
  token: any;
  params: CdRequest = {
    ctx: '',
    m: '',
    c: '',
    a: '',
    dat: {
      token: '',
    },
    args: {}
  };

  constructor(
    private http: HttpClient,
    @Inject('env') private env: EnvConfig,
    private logger: NGXLogger,
  ) {
    // this.logger.debug('core/ServerService::constructor()/this.env:', this.env);
    // const h = new HttpHeaders(env.apiOptions.headers);
    this.options = this.env.apiOptions;
  }

  setEnv(env:EnvConfig){
    this.env = env;
  }

  // proc(params: PostData) {
  //   return this.http.post(this.env.apiEndpoint, params, this.options);
  // }

  // proc(params: PostData) {
  //   // const url: string = `${this.env.apiEndpoint}:${this.env.CD_PORT || 80}`;
  //   const url: string = `http://localhost:3001`;
  //   return this.http.post(url , params, this.options);
  // }

  proc(params: CdRequest){
    this.logger.debug('base/ServerService::proc()/params:', params)
    this.logger.debug('base/ServerService::proc()/this.env.apiOptions.headers:', this.env.apiOptions.headers)
    return this.http.post(this.env.apiEndpoint, params, this.env.apiOptions.headers);
  }

  wsRegister(params: CdRequest){
    this.logger.debug('base/ServerService::wsRegister()/params:', params)
    return this.http.post(this.env.apiEndpoint, params, this.env.apiOptions.headers);
  }

  setParams(p: CdRequest) {
    this.params = p;
  }

  registerResource$(params: any) {
    this.logger.debug('base/ServerService::registerResource()/params:', params)
    return this.http.post(this.env.apiEndpoint, params, this.env.apiOptions.headers);
  }

}
