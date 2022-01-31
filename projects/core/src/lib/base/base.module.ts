import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './IBase';
import { ServerService } from './server.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
})
export class BaseModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ServerService,
        { provide: 'env', useValue: env }
      ]
    };
  }

  static forChild(env: EnvConfig): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ServerService,
        { provide: 'env', useValue: env }
      ]
    };
  }
}
