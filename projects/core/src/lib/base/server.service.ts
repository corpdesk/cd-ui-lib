import { Injectable, Inject } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { PostData, CdResponse, EnvConfig } from './base.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  options: any;
  resp: Observable<ArrayBuffer> = new Observable<ArrayBuffer>();
  token: any;
  params: PostData = {
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

  proc(params: PostData) {
    return this.http.post(this.env.apiEndpoint, params, this.options);
  }

  setParams(p: PostData) {
    this.params = p;
  }

}
