// /*
// interface for gui modules
// */
// export interface ModuleData {
//     path: string;
//     location: string;
//     moduleName: string;
//     rootComponent?: string;
//     description: string;
//     registered?: boolean;
// }

// /*
// interface for api modules
// */
// export class CdModule {
//     module_id: number;
//     module_guid: string;
//     module_name: string;
//     module_description: string;
//     is_public: boolean;
//     is_sys_module: boolean;
//     doc_id: number;
//     enabled: string;
//     last_modification_date: string;
//     group_guid: string;
//     group_name: string;
//     group_owner_id: number;
//     group_type_id: number;
//     company_id: number;
// }

// export class Menu {
//     menu_id: number;
//     menu_name: string;
//     menu_icon: string;
//     menu_guid: string;
//     registered: boolean;
//     location: string;
//     menu_action_id: number;
//     doc_id: string;
//     menu_parent_id: string;
//     menuOrder: number;
//     path: string;
//     description: string;
//     module_id: number;
//     moduleTypeID: number;
//     module_guid: string;
//     module_name: string;
//     moduleName: string;
//     is_public: boolean;
//     is_sys_module: boolean;
//     cd_obj_id: number;
//     cd_obj_name: string;
//     last_sync_date: string;
//     cd_obj_disp_name: string;
//     cd_obj_guid: string;
//     cd_obj_type_guid: string;
//     last_modification_date: string;
//     parent_module_guid: string;
// }

// /*
// interface for api consumer
// */
// export class Consumer {
//     consumer_id: number;
//     consumer_name: string;
//     consumer_guid: string;
//     doc_id: number;
//     company_id: number
// }

// /*
// interface for api consumer resource
// */
// export class ConsumerResource {
//     consumer_resource_id: number;
//     consumer_resource_guid: string;
//     doc_id: number;
//     cd_obj_type_id: number;
//     active: boolean;
//     consumer_id: number;
//     obj_id: number;
// }

// /*
// interface for api company
// */
// export class CdCompany {
//     company_type_id: number;
//     DirectoryCategory_ID: number;
//     company_name: string;
//     PostalAddress: string;
//     Phone: string;
//     E_mail: string;
//     Website: string;
//     Physical_Location: string;
//     Town: string;
//     Country: string;
//     AreaOfSpecialization: string;
//     Logo: string;
//     Fax: string;
//     Password: string;
//     Trusted: string;
//     doc_id: number;
//     town_id: number;
//     county_id: number;
//     company_guid: number;
//     company_description: string;
//     parent_id: number;
// }

// export class DataTablesResponse {
//     data: any[];
//     draw: number;
//     recordsFiltered: number;
//     recordsTotal: number;
// }

import { Validators } from "@angular/forms";
import { FieldType, IQuery } from "../base";
import { ActionType, AWizardModel, ControlType, DdlCtx, DdlData, FieldFor, FieldInfo, FormsService, MultipleChoice, StepModel } from "../guig";
import { MENU_STEP_MODEL } from "./menu.model";

const svForms = new FormsService();

export const ModuleModel: FieldInfo[] = [
    { title: 'ID', name: 'moduleId', dbName: 'module_id', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'number', disabled: true, },
    { title: 'Guid', name: 'moduleGuid', dbName: 'module_guid', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'alphanum', disabled: true },
    { title: 'Name', name: 'moduleName', dbName: 'module_name', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.text, fieldFor: FieldFor.createForm }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(4), Validators.maxLength(20), Validators.required]] },
    { title: 'Description', name: 'moduleDescription', dbName: 'module_description', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.textArea, fieldFor: FieldFor.createForm }], formatt: 'textArea', savable: true, formControlsConfig: ['', [Validators.minLength(0), Validators.maxLength(300)]] },
    { title: 'Enabled', name: 'moduleEnabled', dbName: 'module_enabled', type: FieldType.boolean, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.status, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true },
    { title: 'Sys', name: 'isSysModule', dbName: 'is_sys_module', type: FieldType.boolean, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.status, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.required]] },
    { title: 'System Module', name: 'isSys', controls: [{ controlType: ControlType.toggleSwitch, fieldFor: FieldFor.createForm }], primaryField: 'isSysModule', formControlsConfig: ['', [],], },
    { title: 'App Module', name: 'isApp', controls: [{ controlType: ControlType.toggleSwitch, fieldFor: FieldFor.createForm }], primaryField: 'isSysModule', formControlsConfig: ['', [],] },
    { title: 'Action', name: 'action', type: FieldType.action, fetchable: false, show: true, controls: [{ controlType: ControlType.action, fieldFor: FieldFor.createForm }, { controlType: ControlType.action, fieldFor: FieldFor.tableDisplay }], }
];

export const multipleChoice: MultipleChoice = {
    controllerName: 'isSysModule',
    selectedItem: { index: 0, optControlId: '', value: '', selected: false },
    controlTypes: ControlType.toggleSwitch,
    options: [
      { index: 0, optControlId: 'isSys', value: 'isSys', selected: true },
      { index: 1, optControlId: 'isApp', value: 'isApp', selected: false },
    ],
  }

export const DEFAULT_INSERTABLE_MODULE: any = {
    valid: null,
    data: {},
    ctx: 'Sys'
}

export interface IModuleModel {
    moduleId?: number;
    moduleGuid: string;
    moduleName: string;
    moduleDescription: string;
    docId: number;
    moduleIsPublic: boolean;
    isSysModule: boolean;
    moduleEnabled?: boolean;
    lastModificationDate: string;
    groupGuid?: string;
    moduleTypeId: number;
    order?: number;
}

export enum ModuleScopeOpts {
    isApp = 0,
    isSys = 1
}



export const MODULE_STEP_MODEL: StepModel = {
    token: '',
    stepTitle: 'Create Module',
    stepItems: { nextButtonId: 'stepToMenu' },
    tabPaneId: 'moduleInfo',
    cardTitle: 'Module Information',
    cardTitleDesc: 'Fill all information below',
    module: 'moduleman',
    controller: 'module',
    formGroup: null,
    fields: svForms.filterByFieldFor(ModuleModel, FieldFor.createForm),
}

export const ModuleWizardModel: AWizardModel = {
    name: 'Module Wizard',
    steps: [
        MODULE_STEP_MODEL,
        MENU_STEP_MODEL,
    ]
}



export const MODULE_DEFAULT_DDLD: DdlData[] = [
    {
        menuName: 'create',
        menuGuid: 'bd9b5bda5ab',
        navLocation: '/moduleman/module/create',
        actionType: ActionType.navigate,
    },
    {
        menuName: 'dashboard',
        menuGuid: 'd27294db59c1',
        navLocation: '/moduleman/module/dashboard',
        actionType: ActionType.navigate
    }
];


// DROPDOWN MODEL
export const moduleGetQuery: IQuery = {
    select: ['moduleId', 'moduleName', 'moduleGuid'],
    where: {}
}
export const moduleDdlCtx: DdlCtx = {
    getFn$: null,
    selIndex: moduleGetQuery.select![0],
    selValueField: moduleGetQuery.select![1],
    fetchFields: moduleGetQuery.select!,
    step: null,
    token: null,
    controlName: 'moduleId'
};


