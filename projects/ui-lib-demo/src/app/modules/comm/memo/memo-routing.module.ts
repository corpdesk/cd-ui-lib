import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeComponent } from './compose/compose.component';
import { InTrayComponent } from './in-tray/in-tray.component';
import { OutTrayComponent } from './out-tray/out-tray.component';

const routes: Routes = [
  {
    path: '',
    component: InTrayComponent,
  },
  {
    path: 'in-tray',
    component: InTrayComponent,
  },
  {
    path: 'out-tray',
    component: OutTrayComponent,
  },
  {
    path: 'compose',
    component: ComposeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoRoutingModule { }
