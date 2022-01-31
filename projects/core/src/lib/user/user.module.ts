import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '@corpdesk/core/src/lib/base';
import { UserService } from './user.service';
import { SessService } from './sess.service';
import { GroupService } from './group.service';
import { GroupMemberService } from './group-member.service';
import { MenuService } from '@corpdesk/core/src/lib/moduleman';

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
        UserService,
        SessService,
        GroupService,
        GroupMemberService,
        MenuService,
        { provide: 'env', useValue: env }
      ]
    };
  }

  public static forChild(env: EnvConfig): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [
        UserService,
        SessService,
        GroupService,
        GroupMemberService,
        MenuService,
        { provide: 'env', useValue: env }
      ]
    };
  }
}
