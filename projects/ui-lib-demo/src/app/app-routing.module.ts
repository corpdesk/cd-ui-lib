import { ExtraOptions, RouterModule, Routes, Router } from '@angular/router';
// import { RouterGuardService } from '@corpdesk/core/src/lib/guig/router-guard.service';
import { RouterGuardService } from '@corpdesk/core/src/lib/guig';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'comm',
    loadChildren: () => import('./modules/comm/comm.module')
      .then(m => m.CommModule),
      // canActivate : [RouterGuardService] 
  },
  {
    path: 'pms',
    loadChildren: () => import('./modules/pms/pms.module')
      .then(m => m.PmsModule),
  },
  // { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  // { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  // { path: '', redirectTo: 'comm', pathMatch: 'full' },
  // { path: '**', redirectTo: 'comm' },
];

// const config: ExtraOptions = {
//   useHash: false,
// };

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, config)
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    router.events.subscribe((val) => {
        // see also 
        console.log('AppRoutingModule::constructor()/val:', val) 
    });
  }
}
