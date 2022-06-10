import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { EnvConfig } from '@corpdesk/core/src/lib/base';
import { CdPushService } from './cd-push.service';
import { SocketIoService } from './socket-io.service';
// import { NgxSocketIoService } from './ngx-socket-io.service';

// const config: SocketIoConfig = { url: 'http://localhost:3200', options: {} };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // SocketIoModule.forRoot(config),
  ],
})
export class CdPushModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<CdPushModule> {
    return {
      ngModule: CdPushModule,
      providers: [
        CdPushService,
        SocketIoService,
        // NgxSocketIoService,
        { provide: 'env', useValue: env }
      ]
    };
  }

  static forChild(env: EnvConfig): ModuleWithProviders<CdPushModule> {
    return {
      ngModule: CdPushModule,
      providers: [
        CdPushService,
        SocketIoService,
        // NgxSocketIoService,
        { provide: 'env', useValue: env }
      ]
    };
  }
}
