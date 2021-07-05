import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '@corpdesk/core/src/lib/base';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [
        { provide: 'env', useValue: env }
      ]
    };
  }
}
