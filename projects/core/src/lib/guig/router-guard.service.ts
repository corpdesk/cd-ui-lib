import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// import { SessService } from '../user/sess.service';
// import { SessService } from '../user';
import { IAppState } from '../base';
// import { NavService } from '../../@cd/guig/nav.service';

@Injectable({
    providedIn: 'root'
})
export class RouterGuardService implements CanActivate  {

    constructor(
        public router: Router,
        // private svSess: SessService,
        // private svNav: NavService
    ) {

    }

    async canActivate() {
        console.log('start RouterGuardService::canActivate()')
        // console.log('appState:', this.svSess.appState);
        // if (!this.svSess.appState.success) {
        //     const msg = `Oops! You lack privilage to this page`;
        //     this.sendNotification(msg);
        //     await this.router.navigate(['']);
        // }
        return true;
    }

    sendNotification(msg: string) {
        console.log('start RouterGuardService::sendNotification(msg)')
        console.log('msg:', msg)
    }

}
