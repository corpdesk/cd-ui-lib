import { Injectable, Inject } from '@angular/core';
import { ServerService, CdFilter, EnvConfig, BaseService } from '../base';
// import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from './sess.service';
import { Group } from './group-model';
import { companyDdlCtx, companyGetQuery, CompanyService, ModulemanService } from '../moduleman';
import { AWizardStep, BaseModel, FieldInfo } from '../guig';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  postData: any;
  cd_token: any;
  selectedGroups: Group[] = [];
  isInvalidSelGroups = true;
  ExtFilter: CdFilter[] = [];
  constructor(
    private svBase: BaseService,
    private svServer: ServerService,
    @Inject('env') private env: EnvConfig,
    private svSess: SessService,
    private svModuleman: ModulemanService,
  ) { }

  

  

  registerGroupObsv(regData: any) {
    console.log('starting getGroupsObsv()');
    this.setEnvelopeRegisterGroup(regData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupController",
  //     "a": "actionCreate",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "user_id_member": "1010",
  //                     "member_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //                     "group_guid_parent": "D7FF9E61-B143-D083-6130-A51058AD9630",
  //                     "cd_obj_type_id": "9",
  //                     "is_public": true
  //                 }
  //             }
  //      ],
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeRegisterGroup(regData: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionCreate',
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

  getGroupsObsv(filter: CdFilter[]) {
    console.log('starting getGroupsObsv()');
    console.log('filter:', filter);
    if (typeof (filter) == 'undefined') {
      filter = this.ExtFilter;
    }
    this.setEnvelopeGroups(filter);
    console.log('getGroupsObsv/this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupController",
  //     "a": "actionGetAll",
  //     "dat": {
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeGroups(f: CdFilter[]) {
    console.log('starting setEnvelopeGroups(f: CdFilter[])');
    console.log('f:', f);
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGet',
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

  getGroupRootObsv() {
    console.log('starting getGroupRootObsv()');
    this.setEnvelopeGroupRoot();
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupController",
  //     "a": "actionGetRoot",
  //     "dat": {
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeGroupRoot() {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGetRoot',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }


  getGroupTypesObsv(f: CdFilter[]) {
    console.log('starting getGroupTypesObsv()');
    this.setEnvelopeGroupTypes(f);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // /**
  //  NB: To get all data omit the 'filter' param
  //  * {
  //         "ctx": "Sys",
  //         "m": "User",
  //         "c": "GroupController",
  //         "a": "actionGetTypes",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "filter": [{
  //                         "field": "group_type_id",
  //                         "operator": ">",
  //                         "val":"3"
  //                     }]
  //                 }
  //             ],
  //             "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeGroupTypes(f: CdFilter[]) {
    // //filter sample: 
    // f = [{
    //       field: "group_type_id",
    //       operator: ">",
    //       val: "3"
    //     }]
    let fVals;
    if (!f == null) {
      fVals = f;
    } else {
      fVals = {};
    }

    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGetTypes',
      dat: {
        f_vals: [
          fVals
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }



  joinGroup(member: any) {

  }

  getAll(filter: any) {

  }

  get(filter: any) {

  }

  async loadDdls(baseModel: BaseModel, groupStep: AWizardStep) {
    // moduleDdlCtx.token = baseModel.token;
    // moduleDdlCtx.step = groupStep;
    // moduleDdlCtx.controlName = 'groupTypeGuid';
    // moduleDdlCtx.getFn$ = this.svModule.getModule$(moduleGetQuery, baseModel.token);
    // await this.svModman.setDdl$(await moduleDdlCtx)
    //     .subscribe((ret) => {
    //         // console.log('menu/ConsumerModService::loadDdls()/ret(modules):', ret)
    //         groupStep.fields.forEach((f: FieldInfo) => {
    //             if (f.name === 'groupTypeGuid') {
    //                 f.ddlInfo!.data = ret;
    //             }
    //         })
    //     })

    companyDdlCtx.token = baseModel.token;
    companyDdlCtx.step = groupStep;
    companyDdlCtx.controlName = 'companyId';
    console.log('ConsumerModService::loadDdls()/companyGetQuery:', companyGetQuery)
    companyDdlCtx.getFn$ = this.svBase.getPaged$(companyGetQuery, baseModel.token, 'Sys', 'Moduleman', 'Company');
    await this.svModuleman.setDdl$(await companyDdlCtx)
      .subscribe((ret) => {
        console.log('group/ConsumerModService::loadDdls()/ret(companies):', ret)
        groupStep.fields.forEach((f: FieldInfo) => {
          if (f.name === 'companyId') {
            f.ddlInfo!.data = ret;
          }
        })
      })
  }
}
