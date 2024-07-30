import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '../base';
import { AclService } from './acl.service';
import { CdObjService } from './cd-obj.service';
import { CompanyService } from './company.service';
import { ConsumerService } from './consumer.service';
import { ConsumerResourceService } from './consumer-resource.service';
import { MenuService } from './menu.service';
import { ModuleService } from './module.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ModulemanModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<ModulemanModule> {
    return {
      ngModule: ModulemanModule,
      providers: [
        AclService,
        CdObjService,
        CompanyService,
        ConsumerService,
        ConsumerResourceService,
        MenuService,
        ModuleService,
        { provide: 'env', useValue: env }
      ]
    };
  }

  static forChild(env: EnvConfig): ModuleWithProviders<ModulemanModule> {
    return {
      ngModule: ModulemanModule,
      providers: [
        AclService,
        CdObjService,
        CompanyService,
        ConsumerService,
        ConsumerResourceService,
        MenuService,
        ModuleService,
        { provide: 'env', useValue: env }
      ]
    };
  }
}
