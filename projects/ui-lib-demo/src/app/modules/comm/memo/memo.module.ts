import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoRoutingModule } from './memo-routing.module';
import { ComposeComponent } from './compose/compose.component';
import { OutTrayComponent } from './out-tray/out-tray.component';
import { InTrayComponent } from './in-tray/in-tray.component';


@NgModule({
  declarations: [
    ComposeComponent,
    OutTrayComponent,
    InTrayComponent
  ],
  imports: [
    CommonModule,
    MemoRoutingModule
  ]
})
export class MemoModule { }
