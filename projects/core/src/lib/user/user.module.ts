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
  public static forRoot(env: EnvConfig): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [
        { provide: 'env', useValue: env }
      ]
    };
  }

  public static forChild(env: EnvConfig): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [
        { provide: 'env', useValue: env }
      ]
    };
  }
}
