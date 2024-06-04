import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CdRequest, EnvConfig, CdObjId, ICdRequest } from './IBase';

const OPT_JSON_ALL_CORS = {
  'Content-Type': 'application/json'
};
@Injectable({
  providedIn: 'root'
})
export class WsHttpService {
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

  wsEndPoint: string;

  constructor(
    private http: HttpClient,
    @Inject('env') private env: EnvConfig,
  ) {
    console.log('core/ServerService::constructor()/this.env:', this.env);
    const h = new HttpHeaders(OPT_JSON_ALL_CORS);
    this.options = {
      headers: h
    };

    this.wsEndPoint = `${this.env.sioHost}:${this.env.SOCKET_IO_PORT}`;
  }

  // proc(params: PostData) {
  //   return this.http.post(this.env.apiEndpoint, params, this.options);
  // }

  // proc(params: PostData) {
  //   // const url: string = `${this.env.apiEndpoint}:${this.env.CD_PORT || 80}`;
  //   const url: string = `http://localhost:3001`;
  //   return this.http.post(url , params, this.options);
  // }

  proc(params: CdRequest) {
    console.log('base/ServerService::proc()/params:', JSON.stringify(params))
    console.log('base/ServerService::proc()/this.env.apiOptions:', JSON.stringify(this.env.apiOptions))
    return this.http.post(this.env.apiEndpoint, params, this.env.apiOptions);
  }

  WsHttpService(params: CdRequest) {
    console.log('base/ServerService::wsRegister()/params:', JSON.stringify(params))
    console.log('base/ServerService::wsRegister()/this.env.apiOptions:', JSON.stringify(this.env.apiOptions))
    return this.http.post(this.env.apiEndpoint, params, this.env.apiOptions);
  }

  post(params: CdRequest, route: string) {
    return fetch(`${this.wsEndPoint}/${route}`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: OPT_JSON_ALL_CORS
    })
      // .then(res => res.json())
      // .then(json => console.log(json));
  }

  jwtAuth$(userName: string, password: string) {
    console.log('jwtAuth()/01')
    const requestUrl = `${this.env.sioEndpoint}/auth?username=` + userName + '&password=' + password;
    return this.http.get(requestUrl, this.options);
  }

  registerResource$(params: ICdRequest) {
    console.log('base/ServerService::registerResource$()/params:', JSON.stringify(params))
    return this.http.post(`${this.env.sioEndpoint}/p-reg/`, params, this.env.apiOptions);
  }

  setParams(p: CdRequest) {
    this.params = p;
  }

}
