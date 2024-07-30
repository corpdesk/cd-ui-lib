import { Validators } from "@angular/forms";
import { FieldType, IQuery} from "../base"
import { ControlType, FieldAlias, FieldInfo, ActionType, AWizardModel, ControlFor, FieldFor, FormsService, DdlData, DdlCtx, StepModel } from "../guig";
import { of } from "rxjs";
// import { CREATE_CD_OBJ_MODEL } from "../cd-obj/cd-obj.model";


const svForms = new FormsService();

// menu_id, menu_name, menu_guid, menu_closet_file, cd_obj_id, menu_parent_id, doc_id, module_id, menu_order, `path`, menu_description, menu_lable, menu_icon, menu_enabled, icon_type, `group`, is_title, badge, is_layout, cd_obj_id

export interface IMenuModel {
    menuId?: number;
    menuGuid?: string;
    menuName: string;
    menuDescription: string;
    cdObjId: number;
    menuParentId: number;
    moduleId: number;
    menuOrder?: number;
    path: string;
    menuLable?: string;
    menuIcon: string;
    menuEnabled?: boolean;
}

export const MenuModel: FieldInfo[] = [
    { title: 'ID', name: 'menuId', dbName: 'menu_id', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'number', disabled: true, formControlsConfig: ['', []] },
    { title: 'Guid', name: 'menuGuid', dbName: 'menu_guid', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'alphanum', disabled: true },
    { title: 'Label', name: 'menuLabel', dbName: 'menu_label', type: FieldType.string, fetchable: true, updateable: false, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true },
    { title: 'Name', name: 'menuName', dbName: 'menu_name', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.text, fieldFor: FieldFor.createForm }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(25), Validators.required]] },
    { title: 'MenuParent', name: 'menuParentId', dbName: 'menu_parent_id', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.searchDropDown, fieldFor: FieldFor.createForm }], ddlInfo: { selData$: of([]), selValueField: 'menuName', selIndex: 'menuId', selPlaceholder: '...Choose', data: null }, formatt: 'number', disabled: true, savable: true, formControlsConfig: ['', [Validators.required]] },
    { title: 'ModuleParent', name: 'moduleId', dbName: 'module_id', primaryField: 'menuParent', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.searchDropDown, fieldFor: FieldFor.createForm }], ddlInfo: { selData$: of([]), selValueField: 'moduleName', selIndex: 'moduleId', selPlaceholder: '...Choose', data: null }, formatt: 'number', disabled: true, savable: true, formControlsConfig: ['', [Validators.required]] },
    { title: 'Description', name: 'menuDescription', dbName: 'menu_description', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.textArea, fieldFor: FieldFor.createForm }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(0), Validators.maxLength(300)]] },
    { title: 'Icon', name: 'menuIcon', dbName: 'menu_icon', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.ddlIcons, fieldFor: FieldFor.createForm }], ddlInfo: { selData$: of([]), selValueField: 'iconName', selIndex: 'iconId', selPlaceholder: '...choose', ddlIconId: 'iconDdlIdX', searchInputId: 'searchInputIdX', searchInputName: 'searchInputNameX', selectedValue: '', data: null }, formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(2), Validators.maxLength(50), Validators.required]] },
    { title: 'Path', name: 'path', dbName: 'path', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.text, fieldFor: FieldFor.createForm }], formatt: 'text', formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]] },
    { title: 'Action', name: 'action', type: FieldType.action, fetchable: false, show: true, controls: [{ controlType: ControlType.action, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.action, fieldFor: FieldFor.createForm }], Fn: 'createMenu' },
    { title: 'Search', name: 'iconSearch', type: FieldType.any, controls: [], formControlsConfig: ['', []] }
];

export const DEFAULT_INSERTABLE_MENU: any = {
    data: {},
    cdObj: null,
    valid: null,
    ctx: 'Sys'
}

export const FIELD_ALIAS: FieldAlias[] = [
    {
        toReplace: 'menuLabel',
        replaceWith: 'menuName'
    }
];

export const MENU_STEP_MODEL: StepModel = {
    token: '',
    stepTitle: 'Create Menu',
    stepItems: { prevButtonId: 'stepToModule', lastButtonId: 'endSteps' },
    tabPaneId: 'menuInfo',
    cardTitle: 'Menu Information',
    cardTitleDesc: 'Every module has to have at least one menu item. You can use the + button to add more items.',
    module: 'moduleman',
    controller: 'menu',
    formGroup: null,
    fields: svForms.filterByFieldFor(MenuModel, FieldFor.createForm),
}

export const MenuWizardModel: AWizardModel = {
    name: 'Menu Wizard',
    steps: [
        MENU_STEP_MODEL,
        // UPDATE_CD_OBJ_MODEL, // update icon menu
    ]
}

// DROPDOWN MODEL
export const menuGetQuery: IQuery = {
    select: ['menuId', 'menuName', 'menuGuid'],
    where: {}
}
export const menuDdlCtx: DdlCtx = {
    getFn$: null,
    selIndex: menuGetQuery.select![0],
    selValueField: menuGetQuery.select![1],
    fetchFields: menuGetQuery.select!,
    step: null,
    token: null,
    controlName: 'menuParentId',
};

export const MENU_DEFAULT_DDLD: DdlData[] = [
    {
        menuName: 'create',
        menuGuid: 'bd9b5bda6ab',
        navLocation: '/moduleman/menu/create',
        actionType: ActionType.navigate,
    },
    {
        menuName: 'dashboard',
        menuGuid: 'd27294db69c1',
        navLocation: '/moduleman/menu/dashboard',
        actionType: ActionType.navigate
    }
];

////////////////////////////////////////////////////////
export class Menu {
  menu_id?: number;
  menu_name?: string;
  menu_icon?: string;
  menu_guid?: string;
  registered?: boolean;
  location?: string;
  menu_action_id?: number;
  doc_id?: string;
  menu_parent_id?: string;
  menuOrder?: number;
  path?: string;
  description?: string;
  module_id?: number;
  moduleTypeID?: number;
  module_guid?: string;
  module_name?: string;
  moduleName?: string;
  is_public?: boolean;
  is_sys_module?: boolean;
  cd_obj_id?: number;
  cd_obj_name?: string;
  last_sync_date?: string;
  cd_obj_disp_name?: string;
  cd_obj_guid?: string;
  cd_obj_type_guid?: string;
  last_modification_date?: string;
  parent_module_guid?: string;
  title?: string;
}

export class MenuItem {
  badge: string | null;
  children: any;
  icon: string | null;
  isLayout: string | null;
  isTitle: boolean | number | null;
  menuId: number | null;
  menuLable: string | null;
  menuParentId: number | null;
  path: string | null;
}

export interface SubMenu {
  title?: string;
  link?: string;
  enabled?: boolean;
}

export enum MenuCollection {
  cdDemoMenu = 'cdDemoMenu',
  nazoxDemo = 'nazoxDemo',
  cdMenu = 'cdMenu'
}

export interface ModuleMenu {
  menu_id?: 1030,
  title?: string,
  icon?: any,
  menu_guid?: string,
  registered?: boolean,
  location?: string,
  menu_action_id?: number,
  doc_id?: number,
  menu_parent_id?: number,
  menu_order?: number,
  path?: string,
  description?: string,
  module_id?: number,
  moduleTypeID?: number,
  module_guid?: string,
  module_name?: string,
  moduleName?: string,
  is_public?: boolean,
  is_sys_module?: boolean,
  children?: ModuleMenu[],
  menu_action?: any,
  cd_obj_id?: number,
  cd_obj_name?: string,
  cd_obj_disp_name?: string,
  cd_obj_guid?: string,
  cd_obj_type_guid?: string,
  last_modification_date?: any,
  parent_module_guid?: string,
  parent_class_guid?: string,
  parent_obj?: any,
  show_name?: string,
  obJicon?: string,
  show_icon?: string,
  curr_val?: string,
  enabled?: boolean,
  icon_type?: string
  group?: boolean;

}
