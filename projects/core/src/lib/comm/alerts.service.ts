import { Injectable } from '@angular/core';
import { CdPushEnvelop, SocketIoService } from '@corpdesk/core';
import { AnyCnameRecord } from 'dns';

interface ErrDisplayDat {
  msg: string;
  elemID: string;
  state: string;
  iconWrapID: string;
};

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private svSocket: SocketIoService,
  ) { }

  // showError(err: ErrDisplayDat) {
  //   if (this.validateErr(err)) {
  //     const alert = document.querySelector('.alert');
  //     const alertText = document.getElementById(err.elemID);
  //     const iconWrap = document.getElementById(err.iconWrapID);
  //     if (alert) {
  //       alert.classList.remove('hide', 'alert-danger', 'alert-info', 'alert-warning', 'alert-success');
  //       alert.classList.add('alert-' + err.state);
  //       switch (err.state) {
  //         case 'success':
  //           iconWrap.innerHTML = '<clr-icon class="alert-icon" shape="check-circle"></clr-icon>';
  //           break;
  //         case 'info':
  //           iconWrap.innerHTML = '<clr-icon class="alert-icon" shape="info-circle"></clr-icon>';
  //           break;
  //         case 'warning':
  //           iconWrap.innerHTML = '<clr-icon class="alert-icon" shape="exclamation-triangle"></clr-icon>';
  //           break;
  //         case 'danger':
  //           iconWrap.innerHTML = '<clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>';
  //           break;
  //         default:
  //           alert.classList.add('alert-info');
  //           iconWrap.innerHTML = '<clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>';
  //           break;
  //       }
  //       console.log(alert.classList);
  //       alertText.textContent = err.msg;
  //     }

  //   } else {
  //     this.hideError(err.elemID);
  //   }
  // }

  // validateErr(err: ErrDisplayDat) {
  //   let ret = true;
  //   if (err.msg.length === 0) {
  //     ret = false;
  //   }
  //   return ret;
  // }

  // hideError(elemID: AnyCnameRecord) {
  //   const alert = document.querySelector('.alert');
  //   const alertText = document.getElementById(elemID);
  //   alert.classList.add('hide');
  //   console.log(alert.classList);
  //   alertText.textContent = '';
  // }
}
