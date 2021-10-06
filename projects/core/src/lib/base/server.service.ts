import { Injectable, Inject } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
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
  ) {
    const h = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.options = {
      headers: h
    };
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
    return this.http.post(this.env.apiEndpoint, params, this.options);
  }

  setParams(p: CdRequest) {
    this.params = p;
  }

}
