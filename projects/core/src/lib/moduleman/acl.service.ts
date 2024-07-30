import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { NavService } from '../guig';
import { CdRequest, NavService } from '../base';
// import { SessService } from '../user';

@Injectable({
    providedIn: 'root',
})
export class AclService {
    debug = true;
    postData: CdRequest;
    constructor(
        // private svSess: SessService,
        private router: Router,
        private svNav: NavService,
    ) { }

    async initComponent(params: any, iClient: any, svSess: any) {
        this.log('01','initComponent')
        svSess.setCSess(params.token, iClient);
        // this.log('02','initComponent')
        const asStr = localStorage.getItem(params.token);
        // this.log('03','initComponent')
        // this.log(JSON.stringify(params),'initComponent/params:')
        console.log('AclService::initComponent()/params:', params)
        let ret = false;
        if (asStr) {
            // this.log('04','initComponent')
            iClient.baseModel.jAppState = JSON.parse(asStr);
            // this.baseModel.sess.userId
            // this.log('05','initComponent')
            iClient.baseModel.sess = iClient.baseModel.jAppState.sess!;
            // this.log(iClient.baseModel.sess,'initComponent')
            // this.log('06','initComponent')
            if ('rowId' in params) {
                // this.log('07','initComponent')
                iClient.baseModel.data.rowId = params.rowId;
            }
            // this.log('08','initComponent')
            // this.log('09','initComponent')
            if ('rowData' in params) {
                // this.log('01','initComponent')
                iClient.baseModel.data.rowData = JSON.parse(params.rowData);
            }
            // this.log('10','initComponent')
            if ('fields' in params) {
                // this.log('11','initComponent')
                iClient.baseModel.data.fields = JSON.parse(params.fields);
                // this.log('12','initComponent')
                const nameField = iClient.baseModel.data.fields.filter((f: any) => f.isNameField);
                // this.log('13','initComponent')
                // iClient.title = nameField[0].name;
                iClient.baseModel.data.title = iClient.baseModel.data.rowData[nameField[0].name]
                // this.log('14','initComponent')
            }
            // this.log('15','initComponent')
            ret = true;
        } else {
            const message = 'You need to login with privileges to access'
            const params = {
                queryParams: { msg: message },
                skipLocationChange: true,
                replaceUrl: false
            };
            // iClient.router.navigate(['/user/login'], params);
            this.svNav.nsNavigate(iClient,'/', message)
            ret = false
        }
        return await ret;
    }

    log(msg:string, fx:string){
        if(this.debug){
            console.log(`cd-ui-lib/AclService::${fx}()/${msg}:`)
        }
    }
    
}
