import { Injectable } from '@angular/core';

import { Log } from '../models/observ-model';

@Injectable({
  providedIn: 'root',
})
export class ObservService {
  l: Log = {
    date: new Date(),
    component: '',
    action: '',
    message: '',
  };
  logs: Log[] = [];
  constructor() { }

  getLogs() {
    // console.log('starting ObservService::getLogs()');
    // console.log(this.logs);
    return this.logs;
  }

  addLog(log: Log) {
    console.log('starting ObservService::addLog(log: Log)');
    this.logs.push(log);
  }

  clearLogs() {
    this.logs = [];
  }
}
