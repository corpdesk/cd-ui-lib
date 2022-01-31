import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '@corpdesk/core/src/lib/base';
import { AlertsService } from './alerts.service';
import { CommService } from './comm.service';
import { MessagesService } from './messages.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CommModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<CommModule> {
    return {
      ngModule: CommModule,
      providers: [
        AlertsService,
        CommService,
        MessagesService,
        { provide: 'env', useValue: env }
      ]
    };
  }

  static forChild(env: EnvConfig): ModuleWithProviders<CommModule> {
    return {
      ngModule: CommModule,
      providers: [
        AlertsService,
        CommService,
        MessagesService,
        { provide: 'env', useValue: env }
      ]
    };
  }
}
