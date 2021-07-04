import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';
import { CdFilter } from '@corpdesk/base';


@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private postData: any;
  currentModule = '';
  public Modules: any;
  resp: any;
  selectedModules = [];
  isInvalidSelModules = true;
  successNewModule = false;

  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService
  ) { }

  // register module
  registerModule(data: any) {
    console.log(data);
    console.log(data.is_sys_module);
    data = this.cleanRegData(data);
    this.setEnvelopeRegModule(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        res.app_state.success = Number(res.app_state.success);
        if (res.app_state.success === 1) {
          this.successNewModule = true;
        }
        this.setRespRegModule(res.data);
      });
  }

  registerModuleObsv(data: any) {
    console.log(data);
    console.log(data.is_sys_module);
    data = this.cleanRegData(data);
    this.setEnvelopeRegModule(data);
    /*
    post login request to server
    */
    return this.svServer.proc(this.postData);
  }

  cleanRegData(data: any) {
    data.is_sys_module = Number(data.is_sys_module);
    if (data.is_sys_module === 1) {
      data.is_sys_module = true;
    } else {
      data.is_sys_module = false;
    }
    data.module_type_id = Number(data.module_type_id);
    return data;
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "ModulesController",
  //         "a": "actionRegisterModule",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "data": {
  //                         "module_name": "FooModule",
  //                         "is_sys_module": false,
  //                         "module_type_id": 1
  //                     }
  //                 }
  //             ],
  //             "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeRegModule(regData: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionRegisterModule',
      dat: {
        f_vals: [
          {
            data: regData
          }
        ],
        docproc: {},
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  setRespRegModule(data: any) {
    console.log(data);
  }

  /**
   * Guig table update
   * @param updateData 
   * @param configId 
   * @param fieldId 
   */
  tUpdate(updateData: any, fieldId: any) {
    console.log('starting MenuService::updateMenuConfig()');
    // console.log('updateData:', JSON.stringify(updateData));
    this.updateModulePost(updateData, fieldId);
    console.log('this.postData:', JSON.stringify(this.postData));
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log(res);
        this.respUpdateModule(res);
      });
  }

  updateModulePost(updateData: any, fieldId: any) {
    console.log('starting ModuleService::updateModulePost()');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionUpdate',
      dat: {
        f_vals: [
          {
            filter: [
              {
                field: 'module_id',
                operator: '=',
                val: fieldId
              }
            ],
            data: updateData
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    }
  }

  respUpdateModule(res: any) {
    console.log('starting ModulesService::respUpdateModule(res)');
    console.log(res);
    this.resp = res;
    this.getGetAll();
  }

  /**
   * deregiser module item
   * @param rowData: object 
   * tRefresh() should be called thereafter
   * to refresh table view
   */
  tTrash(rowData: any){
    return this.deRegisterModuleObsv(rowData.module_name, rowData.is_sys_module);
  }



  /**
   * should return observable that the table can use to refresh
   */
  tRefreshObsv(){
    this.setEnvelopeGetAll();
    return this.svServer.proc(this.postData);
  }

  
  /**
   * deregister module
   */
  deRegisterModule(moduleName: any, isSysModule: any) {
    let data = {
      module_name: moduleName,
      is_sys_module: isSysModule
    };
    data = this.cleanRegData(data);
    this.setEnvelopeDeRegModule(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegModule(res.data);
      });
  }

  deRegisterModuleObsv(moduleName: any, isSysModule: any) {
    console.log('starting deRegisterModuleObsv()');
    let data = {
      module_name: moduleName,
      is_sys_module: isSysModule,
      module_type_id: 1
    };
    data = this.cleanRegData(data);
    this.setEnvelopeDeRegModule(data);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post login request to server
    */
    return this.svServer.proc(this.postData);
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "ModulesController",
  //         "a": "actionRegisterModule",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "data": {
  //                         "module_name": "FooModule",
  //                         "is_sys_module": false
  //                     }
  //                 }
  //             ],
  //             "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeDeRegModule(deRegData: any) {
    console.log('ModulesService::setEnvelopeDeRegModule(deRegData)');
    console.log(deRegData);
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionDeRegisterModule',
      dat: {
        f_vals: [
          {
            data: deRegData
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  toggleEnable(moduleID: any, state: any) {
    state = Boolean(state);
    if (state === true) {
      this.disableModule(moduleID);
    } else {
      this.enableModule(moduleID);
    }
  }

  enableModule(moduleID: any) {
    // let data = {
    //   module_name: moduleName,
    //   is_sys_module: isSysModule
    // };
    // data = this.cleanRegData(data);
    this.setEnvelopEnableModule(moduleID);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegModule(res.data);
      });
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //       "ctx": "Sys",
  //       "m": "Moduleman",
  //       "c": "ModulesController",
  //       "a": "actionEnable",
  //       "dat": {
  //           "f_vals": [
  //               {
  //                   "data": {
  //                       "module_id": 92
  //                   }
  //               }
  //           ],
  //           "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //       },
  //       "args": null
  //   }
  //  */
  setEnvelopEnableModule(moduleID: any) {
    console.log('ModulesService::setEnvelopEnableModule(moduleID)');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionEnable',
      dat: {
        f_vals: [
          {
            data: { module_id: moduleID }
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  disableModule(moduleID: any) {
    this.setEnvelopeDisableModule(moduleID);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegModule(res.data);
      });
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //       "ctx": "Sys",
  //       "m": "Moduleman",
  //       "c": "ModulesController",
  //       "a": "actionDisable",
  //       "dat": {
  //           "f_vals": [
  //               {
  //                   "data": {
  //                       "module_id": 92
  //                   }
  //               }
  //           ],
  //           "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //       },
  //       "args": null
  //   }
  //  */
  setEnvelopeDisableModule(moduleID: any) {
    console.log('ModulesService::setEnvelopeDisableModule(moduleID)');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionDisable',
      dat: {
        f_vals: [
          {
            data: { module_id: moduleID }
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  registerModuleUser(moduleID: any) {

  }

  getGetAll() {
    console.log('starting getGetAll()');
    this.setEnvelopeGetAll();
    console.log('this.postData:', this.postData);
    /*
    post request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespGetAll(res.data);
      });
  }

  getGetAllObsv() {
    console.log('starting getGetAll()');
    this.setEnvelopeGetAll();
    console.log('this.postData:', this.postData);
    return this.svServer.proc(this.postData)
  }

  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "ModulesController",
  //         "a": "actionGetAll",
  //         "dat": {
  //             "token": "C64AC158-80F7-5AA7-D3A6-240E399B1A0A"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeGetAll() {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionGetAll',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  getGetObsv(filter: CdFilter) {
    console.log('starting getGetObsv()');
    this.setEnvelopeGet(filter);
    console.log('this.postData:', this.postData);
    return this.svServer.proc(this.postData)
  }

  // {
  //     "ctx": "Sys",
  //     "m": "Moduleman",
  //     "c": "ModulesController",
  //     "a": "actionGetModules",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "filter": [
  //                     {
  //                         "field": "module_name",
  //                         "operator": "=",
  //                         "val": "booking"
  //                     }
  //                 ]
  //             }
  //         ],
  //         "token": "CE25F8B5-5A30-9EA4-4E7E-315F494E5D46"
  //     },
  //     "args": null
  // }
  setEnvelopeGet(f: CdFilter) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionGetModules',
      dat: {
                f_vals: [
              {
                  filter: f
              }
          ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  setRespGetAll(data: any) {
    console.log('starting setRespGetAll()');
    console.log('data:', data);
    console.log(data);
    this.Modules = data;
  }

  tRefresh(){

  }

  

}
