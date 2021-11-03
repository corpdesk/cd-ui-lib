import { Injectable } from '@angular/core';
import { CdRequest } from '@corpdesk/core/src/lib/base';
import { SessService } from '@corpdesk/core/src/lib/user';

@Injectable({
    providedIn: 'root',
})
export class AclService {
    postData: CdRequest;
    constructor(
        private svSess: SessService,
    ) { }

    async initComponent(params: any, iClient: any) {
        console.log('starting AclService::initComponent()')
        this.svSess.setCSess(params.token, iClient);
        console.log('AclService::initComponent()/01')
        const asStr = localStorage.getItem(iClient.token);
        console.log('AclService::initComponent()/02')
        let ret = false;
        if (asStr) {
            console.log('AclService::initComponent()/04')
            iClient.jAppState = JSON.parse(asStr);
            iClient.sess = iClient.jAppState.sess!;
            if ('rowId' in iClient) {
                iClient.rowId = params.rowId;
            }
            console.log('AclService::initComponent()/05')
            if ('rowData' in params) {
                iClient.rowData = JSON.parse(params.rowData);
            }
            console.log('AclService::initComponent()/06')
            if ('fields' in params) {
                console.log('AclService::initComponent()/07')
                iClient.fields = JSON.parse(params.fields);
                console.log('AclService::initComponent()/08')
                console.log('AclService::initComponent()/09')
                const nameField = iClient.fields.filter((f: any) => f.isNameField);
                console.log('AclService::initComponent()/10')
                iClient.title = nameField[0].title;
                console.log('AclService::initComponent()/11')
            }
            ret = true;
            console.log('AclService::initComponent()/12')
        } else {
            const params = {
                queryParams: { msg: 'You need to login with privileges to access' },
                skipLocationChange: true,
                replaceUrl: false
            };
            iClient.router.navigate(['/user/login'], params);
            ret = false
        }
        console.log('AclService::initComponent()/05')
        return await ret;
    }
}
