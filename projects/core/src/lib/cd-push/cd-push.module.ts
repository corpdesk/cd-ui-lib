import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '@corpdesk/core/src/lib/base';
// @corpdesk/core/src/lib/cd-push

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CdPushModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<CdPushModule> {
    return {
      ngModule: CdPushModule,
      providers: [
        { provide: 'env', useValue: env }
      ]
    };
  }

  static forChild(env: EnvConfig): ModuleWithProviders<CdPushModule> {
    return {
      ngModule: CdPushModule,
      providers: [
        { provide: 'env', useValue: env }
      ]
    };
  }
}
