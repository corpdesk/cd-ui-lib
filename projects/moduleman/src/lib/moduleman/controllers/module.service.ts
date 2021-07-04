// RxJS
import { Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { Observable } from 'rxjs'; // not working
import 'rxjs/add/operator/map';
// import { map, filter } from 'rxjs/operators';


import { ModuleData } from '../models/module.model';
// import { Http } from '@angular/http'; // not working
import { HttpClient } from '@angular/common/http';
import { Injectable, Compiler, Inject, ReflectiveInjector, Injector, COMPILER_OPTIONS } from '@angular/core';

import { map } from 'rxjs/operators';

// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularForms from '@angular/forms';
import * as AngularRouter from '@angular/router';
// import * as AngularClarity from '@clr/angular';
import * as BrowserAnimations from '@angular/platform-browser/animations';

import { AddonService } from './addon.service';

import { PostData, CdResponse, ENDPOINT_APPS } from '@corpdesk/base';
import { ServerService } from './server.service';
import { AppStateService } from './app-state.service';
import { UserService } from '../../user/controllers/user.service';

declare var SystemJS: any;

@Injectable()
export class ModuleService {
    // source = `http://${window.location.host}/`;

    constructor(
        private compiler: Compiler,
        private http: HttpClient,
        private addonService: AddonService,
        private svAppState: AppStateService,
        private svServer: ServerService,
        private svUser: UserService,
    ) {
        console.log(compiler);
    }

    // loadModules(): Observable<any> {
    //     console.log('starting ModuleService::loadModules()');
    //     return this.http.get('./assets/modules.json');
    //     // this.svServer.setParams({
    //     //     ctx: 'Sys',
    //     //     m: 'Moduleman',
    //     //     c: 'ModulesController',
    //     //     a: 'actionGetMenu',
    //     //     dat: {
    //     //         token: this.svServer.token,
    //     //     },
    //     //     args: null
    //     // });
    //     // return this.svServer.proc(this.svServer.params)['data'];
    // }


    // loadModule(moduleInfo: ModuleData): Observable<any> {
    //     console.log('starting ModuleService::loadModule()');
    //     console.log('moduleInfo>>');
    //     console.log(moduleInfo);
    //     const url = ENDPOINT_APPS + moduleInfo.location;
    //     return this.http.get(url)
    //         .map((res: any) => res.text())
    //         .map(source => {
    //             const exports = {}; // this will hold module exports
    //             const modules = {   // this is the list of modules accessible by plugins
    //                 '@angular/core': AngularCore,
    //                 '@angular/common': AngularCommon,
    //                 '@angular/forms': AngularForms,
    //                 '@angular/router': AngularRouter,
    //                 '@angular/platform-browser/animations': BrowserAnimations,
    //                 // '@clr/angular': AngularClarity
    //             };

    //             // shim 'require' and eval
    //             const require: any = (module) => modules[module];
    //             eval(source);
    //             // Need to check if there is another solution for eval as this is described as 'Evil'

    //             this.compiler.compileModuleAndAllComponentsSync(exports[`${moduleInfo.moduleName}`]);
    //             // console.log(exports); // disabled as this object is cleared anyway
    //             return exports;
    //         });
    // }

    loadModuleSystemJS(moduleInfo: ModuleData): Promise<any> {
        console.log('starting ModuleService::loadModuleSystemJS()');
        console.log('moduleInfo>>');
        console.log(moduleInfo);
        const url = ENDPOINT_APPS + moduleInfo.location;
        SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
        SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
        SystemJS.set('@angular/forms', SystemJS.newModule(AngularForms));
        SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
        SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
        // SystemJS.set('@clr/angular', SystemJS.newModule(AngularClarity));

        // now, import the new module
        return SystemJS.import(`${url}`).then((module: any) => {
            console.log(module);
            return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
                console.log(compiled);
                return module;
            });
        });
    }

    loadSysJs(moduleInfo: ModuleData) /*Promise<any>*/ {
        console.log('starting ModuleService::loadSysJs()');
        const url = ENDPOINT_APPS + moduleInfo.location;
        const moduleName = moduleInfo.moduleName;
        // return this.addonService.loadAddon(url, moduleName).then((module: any) => {
        //     // this.view.clear();
        //     // this.view.insert(cmpRef.hostView);
        //     console.log(module);
        //     return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
        //         console.log(compiled);
        //         return module;
        //     });
        // });
    }
}