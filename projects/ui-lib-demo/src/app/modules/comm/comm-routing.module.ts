import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'memo',
    loadChildren: () => import('./memo/memo.module')
      .then(m => m.MemoModule),
  },
  {
    path: 'inte-ract',
    loadChildren: () => import('./inte-ract/inte-ract.module')
      .then(m => m.InteRactModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module')
      .then(m => m.ChatModule),
  },
  // { path: '', redirectTo: 'memo', pathMatch: 'full' },
  // { path: '**', redirectTo: 'memo' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommRoutingModule { }
