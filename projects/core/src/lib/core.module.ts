import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from './base';
import { CdPushModule } from './cd-push';
import { GuigModule } from './guig';
import { InteRactModule } from './inte-ract';
import { ModulemanModule } from './moduleman';
import { SchedulerModule } from './scheduler';
import { UserModule } from './user';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseModule,
    CdPushModule,
    CommonModule,
    GuigModule,
    InteRactModule,
    ModulemanModule,
    SchedulerModule,
    UserModule
  ],
  exports: [
    BaseModule,
    CdPushModule,
    CommonModule,
    GuigModule,
    InteRactModule,
    ModulemanModule,
    SchedulerModule,
    UserModule
  ]
})
export class CoreModule { }
