import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { environment } from '../../../../../environments/environment';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { FileUploader } from 'ng2-file-upload';
import { HttpHeaders } from '@angular/common/http';
import { ServerService, EnvConfig } from '@corpdesk/core/src/lib/base';
// import { SessService } from '@corpdesk/core/src/lib/user';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) { }
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  token: any;
  postData: any;
  params: any;
  currentUser: any;
  messeges: any;
  contacts: any;
  selectedID = 0;
  selectedMsg;
  selectedFile: ImageSnippet;
  attachments: any = [];
  progressArr: any = [];
  filesToUpload: Array<File> = [];
  // hasAttachments = true;
  uploadForm: FormGroup;
  // public uploader: FileUploader = new FileUploader({
  //   isHTML5: true
  // });

  constructor(
    @Inject('env') private env: EnvConfig,
    private http: HttpClient,
    private svServer: ServerService,
    // private svSess: SessService,
  ) {
    this.selectedMsg = new Object();
    // this.selectedMsg.attachment_guid = '';
  }

  init(res: any) {
    console.log('starting MessagesService::init()');
    console.log(res);

    if (res) {
      this.token = res.app_state.sess.cd_token;
      this.messeges = res.data.memo_summ;
      this.contacts = res.data.contacts;
      this.currentUser = res.data.user_data[0];
      const msgID = this.messeges[0].memo_id;
      this.selectedMsg = this.messeges.find((i: any) => i.memo_id === msgID);
      console.log('this.selectedMsg>>');
      console.log(this.selectedMsg);
    }


    // this.uploader.onAfterAddingFile = (file) => {
    //   file.withCredentials = false;
    //   console.log('file added');
    // };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    //   console.log('File uploaded successfully');
    // };
    // this.uploader.onProgressItem = (progress: any) => {
    //   console.log('upload progressing...');
    //   console.log(progress['progress']);
    // };
  }




  setMessage(msgID: any) {
    console.log('starting MessagesService::setMessage(' + msgID + ')');
    const str = this.messeges.find((i: any) => i.memo_id === msgID);
    this.selectedMsg = str;
    console.log('this.selectedMsg>>');
    console.log(this.selectedMsg);
  }

  msgListClick() {
    console.log('starting msgListClick()');
  }

  extractContent(s: any) {
    const span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  private onSuccess() {
    console.log('starting onSuccess()');
    // this.selectedFile.pending = false;
    // this.selectedFile.status = 'ok';
  }

  private onError() {
    console.log('starting onError()');
    // this.selectedFile.pending = false;
    // this.selectedFile.status = 'fail';
    // this.selectedFile.src = '';
  }

  processFile(event: any, uploadForm: any) {
    console.log('starting processFile()');
    this.uploadForm = uploadForm;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const uf = this.uploadForm.get('profile');
      if (uf) {
        uf.setValue(file);
      }
    }
    // const file: File = fileInput.files[0];
    // const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    //   const formData = new FormData();
    //   this.selectedFile.pending = true;
    //   formData.append('att', this.selectedFile.file);
    //   console.log('formData>>');
    //   console.log(formData);
    //   this.setAttachParams();
    //   console.log('params>>');
    //   console.log(this.params);
    //   this.setHeaders();
    //   this.svServer.proc(this.params).subscribe(
    //     (res) => {
    //       this.onSuccess();
    //     },
    //     (err) => {
    //       this.onError();
    //     });
    // });

    // reader.readAsDataURL(file);
  }

  uploadFiles(frmAttachment: any, token: any) {
    // console.log('starting uploadFiles()');
    // const formData = new FormData();
    // const files: Array<File> = this.filesToUpload;
    // console.log(files);
    // console.log('this.uploader>>');
    // console.log(this.uploader);

    // this.uploader.queue.forEach((f, i) => {
    //   const fileItem = this.uploader.queue[i]._file;
    //   if (fileItem.size > 10000000) {
    //     alert('Each File should be less than 10 MB of size.');
    //     return;
    //   }
    // });

    // this.uploader.queue.forEach((f, j) => {
    //   // this.uploader.onProgressItem = (progress: any) => {
    //   //   console.log('progressing...');
    //   //   console.log(progress['progress']);
    //   // };
    //   const formData = new FormData();
    //   const fileItem = this.uploader.queue[j]._file;
    //   console.log(fileItem.name);
    //   formData.append('file', fileItem);
    //   formData.append('fileSeq', 'seq' + j);
    //   console.log('frmAttachment.controls.type>>');
    //   console.log(frmAttachment.controls.type);
    //   console.log('frmAttachment.controls.type.value>>');
    //   console.log(frmAttachment.controls.type.value);
    //   formData.append('dataType', frmAttachment.controls.type.value);
    //   // this.uploadFile(data).subscribe(data => alert(data.message));
    //   console.log('data>>');
    //   console.log(formData);
    //   this.setAttachParams(formData, token);
    //   console.log('params>>');
    //   console.log(this.params);
    //   formData.append('ctx', JSON.stringify(this.params.ctx));
    //   formData.append('m', JSON.stringify(this.params.m));
    //   formData.append('c', JSON.stringify(this.params.c));
    //   formData.append('a', JSON.stringify(this.params.a));
    //   formData.append('dat', JSON.stringify(this.params.dat));
    //   this.setHeaders();

    ///////////////////////////////////////
    // this.svServer.proc(data).subscribe(
    //   (res) => {
    //     this.onSuccess();
    //   },
    //   (err) => {
    //     this.onError();
    //   });
    ///////////////////////////////////////
    // this.submitFile(formData, fileItem.name, j);
    // });
    // this.uploader.clearQueue();
  }

  uploaderQueue() {
    // console.log(this.uploader.queue[0].file);
    // console.log(this.uploader.queue[0].file.type);
  }

  /*
  uploadables: ".png, .jpg, .pdf, .zip, .docx, .odt, .mp3, .mp4"
  */
  getIconStyle(fileItem: any) {
    let iconStyle = { iClass: '', iStyle: {} };
    switch (fileItem.file.type) {
      case 'application/pdf':
        iconStyle = { iClass: 'fa fa-file-pdf-o', iStyle: { color: 'red', 'font-size': '24px' } };
        break;
      case 'application/zip':
        iconStyle = { iClass: 'fa fa-file-zip-o', iStyle: { color: 'brown', 'font-size': '24px' } };
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        iconStyle = { iClass: 'fa fa-file-word-o', iStyle: { color: 'rgb(37, 128, 247)', 'font-size': '24px' } };
        break;
      case 'application/vnd.oasis.opendocument.text':
        iconStyle = { iClass: 'fa fa-file-text-o', iStyle: { color: 'rgb(37, 128, 247)', 'font-size': '24px' } };
        break;
      case 'image/jpeg':
        iconStyle = { iClass: 'fa fa-file-image-o', iStyle: { color: 'pink', 'font-size': '24px' } };
        break;
      case 'image/png':
        iconStyle = { iClass: 'fa fa-file-image-o', iStyle: { color: 'pink', 'font-size': '24px' } };
        break;
      case 'image/gif':
        iconStyle = { iClass: 'fa fa-file-image-o', iStyle: { color: 'pink', 'font-size': '24px' } };
        break;
      case 'text/htm':
        iconStyle = { iClass: 'fa fa-file-code-o', iStyle: { color: 'green', 'font-size': '24px' } };
        break;
      case 'text/html':
        iconStyle = { iClass: 'fa fa-file-code-o', iStyle: { color: 'green', 'font-size': '24px' } };
        break;
      case 'text/plain':
        iconStyle = { iClass: 'fa fa-file-o', iStyle: { color: 'gray', 'font-size': '24px' } };
        break;
      case 'audio/mp3':
        iconStyle = { iClass: 'fa fa-file-movie-o', iStyle: { color: 'orange', 'font-size': '24px' } };
        break;
      case 'video/mp4':
        iconStyle = { iClass: 'fa fa-file-movie-o', iStyle: { color: 'orange', 'font-size': '24px' } };
        break;
      case 'video/gif':
        iconStyle = { iClass: 'fa fa-file-movie-o', iStyle: { color: 'orange', 'font-size': '24px' } };
        break;
      default:
        iconStyle = { iClass: 'fa fa-file', iStyle: { color: 'rgb(162, 162, 163)', 'font-size': '24px' } };
    }
    // fa fa-file-code-o
    return iconStyle;
  }

  hasAttachments() {
    console.log('starting hasAttachments()');
    let ret = false;
    // if (this.uploader.queue.length > 0) {
    //   ret = true;
    // } else {
    //   ret = false;
    // }
    return ret;
  }

  setAttachParams(formData: any, cdToken: any) {
    this.params = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'saveCommAttach',
      dat: {
        fields: null,
        f_vals: [
          {
            data: {
              memo_file: formData,
              memo_type_id: 4,
              conv_id: 0
            },
            docproc: {
              subject: 'ng memo test'
            },
            commconversationsub: [
              1010,
              1075
            ]
          }
        ],
        token: cdToken
      },
      args: null
    };
  }

  setHeaders() {
    const h = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    this.svServer.options = {
      headers: h
    };
  }

  /*
  As per example:
  https://www.positronx.io/angular-file-upload-with-progress-bar-tutorial/
  https://github.com/SinghDigamber/fileupload-progressbar-angular
  */
  // submitFile(formData: any, fName: any, i: any) {
  //   this.addFile(formData)
  //     .subscribe((event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           console.log('Request has been made!');
  //           break;
  //         case HttpEventType.ResponseHeader:
  //           console.log('Response header has been received!');
  //           break;
  //         case HttpEventType.UploadProgress:
  //           this.progressArr.push({ name: fName, progress: 0 });
  //           const et = event.total;
  //           if (et) {
  //             this.progressArr[i]['progress'] = Math.round(event.loaded / et * 100);
  //           }

  //           console.log(`Uploaded! ${this.progressArr[i]['progress']}%`);
  //           break;
  //         case HttpEventType.Response:
  //           console.log('User successfully created!', event.body);
  //           setTimeout(() => {
  //             this.progressArr[i]['progress'] = 0;
  //           }, 1500);
  //       }
  //     })
  // }

  // addFile(name: string, profileImage: File, cdToken): Observable<any> {
  // addFile(formData: FormData): /* Observable<any> */ {
  //   // const formData: any = new FormData();
  //   // formData.append('name', name);
  //   // formData.append('avatar', profileImage);
  //   // this.setAttachParams(formData, cdToken);
  //   // formData.append('ctx', JSON.stringify(this.params.ctx));
  //   // formData.append('m', JSON.stringify(this.params.m));
  //   // formData.append('c', JSON.stringify(this.params.c));
  //   // formData.append('a', JSON.stringify(this.params.a));
  //   // formData.append('dat', JSON.stringify(this.params.dat));


  //   // return this.http.post(`${environment.HOST}:4000/api/create-user`, formData, {
  //   // return this.http.post(`${this.env.HOST}:8080/api`, formData, {
  //   //   reportProgress: true,
  //   //   observe: 'events'
  //   // }).pipe(
  //   //   catchError(this.errorMgmt)
  //   // )
  // }

  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}
