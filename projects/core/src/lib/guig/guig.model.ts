import { Type } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { FieldType, IQuery, IAppState, ISessResp } from '../base';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

export enum ControlType {
  input = 0,
  text = 1,
  textArea = 2,
  psswdText = 3,
  select = 4,
  selectMultiple = 5,
  dropDown = 6,
  searchDropDown = 7,
  ddlCountries = 8,
  ddlIcons = 9,
  ddlNotifications = 10,
  radioButton = 11,
  dualRaido = 12,
  dualSwitch = 13,
  checkBox = 14,
  toggleSwitch = 15,
  ngToggle = 16,
  rangeInput = 17,
  dateSelector = 18,
  upload = 19,
  action = 20,
  status = 21,
}

/**
 * define where a field item can be applied
 * eg a field item can be applied on create form but
 * is not applicable for table generation
 */
export enum FieldFor {
  createForm = 0,
  tableDisplay = 1,
  editForm = 2,
  deleteForm = 3,
}

export interface ControlFor {
  fieldFor: FieldFor;
  controlType: ControlType;
}



export interface FieldInfo {
  title: string;
  name: string;
  primaryField?: string;
  type?: FieldType;
  index?: boolean;
  dbName?: string;
  searchable?: boolean;
  fetchable?: boolean;
  savable?: boolean;
  updateable?: boolean;
  disabled?: boolean;
  show?: boolean;
  controls: ControlFor[];
  ddlInfo?: DdlInfo;
  controlData?: any[];
  formatt?: string;
  isNameField?: boolean;
  ActionType?: ActionType;
  Fn?: string;
  /**
   * formControlsConfig:
   * used by angular formBuilder to output the form group
   * the data also controlls form validation
   * - the type defined below is taken from angular input for form builder
   */
  formControlsConfig?: { [key: string]: any; }, options?: AbstractControlOptions | null | undefined;
}

export interface DdlInfo {
  config?: any;
  header?: {
    title: { lable: string; cls: string; action: any },
    sideLink: { lable: string; cls: string; action: any },
  };
  footer?: { label: string; icon: string; action: any; };
  selData$: Observable<any>;
  selValueField: string;
  selIndex: string;
  selPlaceholder?: string;
  ddlIconId?: string;
  searchInputId?: string;
  searchInputName?: string;
  selectedValue?: string;
  iconButtonId?: string;
  data: any;
}

export interface SelectData {
  value: string;
  text: string;
}

export interface EmittedDdlSelection {
  step: AWizardStep | null;
  controlName: string;
}

export interface DdlIconItem {
  cls: string;
  action?: any;
  numericLabel?: number;
  icon: { cls: string; },
  text: string;
  id?: number;
  tags: string;
}

export interface DdlCtx {
  getFn$: Observable<any> | null;
  selIndex: string;
  selValueField: string;
  controlName: string;
  fetchFields: string[];
  step: AWizardStep | null;
  token: string | null;
};

export interface MultipleChoice {
  controllerName: string;
  selectedItem: OptionItem;
  controlTypes: ControlType;
  options: OptionItem[];
}

export interface OptionItem {
  index: number;
  optControlId: string;
  value: string;
  selected: boolean;
}

export interface FaDbItem {
  attributes: {
    id: string;
    membership: {
      free: string[];
      pro: string[];
    },
    styles: string[];
    unicode: string;
    voted: boolean;
  },
  id: string;
  links: {
    self: string;
  },
  type: string;
  tags?: string;
}

interface PageElement { elemId: string; pageNumber: number; valid: boolean; }

export enum TRenderMode {
  pgInit = 0,
  pgPrev = 1,
  pgNext = 2,
}

export interface TRenderCtx {
  renderMode: TRenderMode;
  startPage: number;
}

export interface StatusField {
  value: string;
  class: string;
}
// TDS: Table Data Source
export interface TDS {
  fields: FieldInfo[];
  data: any[];
}

export interface Page {
  thisPage: number;
  displayPage: boolean | null;
  isActive: boolean;
  items: number[];
}

export interface TPD {          //////////////////////////////////////
  totalRows: number;          // total rows from a given query.
  totalPages: number | null;  // total pages posible
  pageRows: number;           // rows per page
  maxPages: number;           // max pages to display on paginator
  startPage: number;          // first page to display on paginator
  pages: Page[];              // array of every page and row items
  activePage: number;         // selected page
  //////////////////////////////////////
}

export interface DsEmittData {
  sQuery: IQuery,
  ctx: number,
  tpData: TPD
}

export interface FieldAlias {
  toReplace: string;
  replaceWith: string;
}

export const DEFAULT_TPD: TPD = {
  totalRows: 0,
  totalPages: null,
  pageRows: 5,
  maxPages: 4,
  startPage: 1,
  pages: [],
  activePage: 1,
};

/**
 * will require refinement
 * see NazTableService::hDdl(iClient: any)
 *  menuName and menuGuid are freeks
 */
export interface DdlData {
  config?: { suppressScrollX: boolean; wheelSpeed: any };
  header?: {
    title: { lable: 'Notifications', cls: '', action: null },
    sideLink: { lable: 'View All', cls: '', action: null },
  },
  footer?: { label: 'View All', icon: '', action: null },
  data?: any[],
  menuName?: string;
  menuGuid?: string;
  navLocation?: string;
  actionType?: ActionType;
  fn?: string;
}

export const DEFAULT_DDL_DATA: DdlData = {
  config: { suppressScrollX: true, wheelSpeed: 0.3 },
  header: {
    title: { lable: 'Notifications', cls: '', action: null },
    sideLink: { lable: 'View All', cls: '', action: null },
  },
  footer: { label: 'View All', icon: '', action: null },
  // selValueField: '', 
  // selIndex: '',
  data: [
    {
      label: 'item 1',
      description: 'If several languages coalesce the grammar',
      time: '3 min ago',
      // iconId: '',
      // iconName: '',
      // action: null,
      // attributes: {
      //   id: 'atlassian',
      //   membership: {
      //     free: ['brands'],
      //     pro: ['brands']
      //   },
      //   styles: ['brands'],
      //   unicode: 'f77b',
      //   voted: true
      // },
      // id: 'atlassian',
      // links: {
      //   self: '/api/icons/atlassian'
      // },
      // type: 'icon'
    },
    {
      label: 'item 2',
      description: 'It will seem like simplified English',
      time: '1 hr ago'
    },
    {
      label: 'item 3',
      description: 'If several languages coalesce the grammar',
      time: '4 hr ago'
    }
  ]
}

export enum ActionType {
  navigate = 0,
  execFn = 1
}

export interface GuigTableCol {
  index: number;
  name: string; // lable that is adopted for the table
  map?: string; // the field name apearing in the data (could be an alias as per the sql fetch)
  tField?: string; // the field name used for updating base table
  dataType?: string;
  icon?: string;
  controlTytypepe: string;
  action?: string;
  editable?: boolean;
  disabled?: boolean;
  hide?: boolean; // for visually hiding a column
  alt?: any[];
}

export interface GuigTableConfig {
  columns: GuigTableCol[];
}

export interface TabMeta {
  title: string;
  options: any;
}
export class TabItem {
  constructor(public component: Type<any>, public data: TabMeta) { }
}

export interface TabComponent {
  data: any;
}

///////////////////////
// STEPPER WIZARD
export interface AWizardModel {
  name: string;
  steps: AWizardStep[];
}

export interface AWizardStep {
  token: string;
  stepTitle: string;
  stepItems: { prevButtonId?: string; nextButtonId?: string, lastButtonId?: string },
  tabPaneId: string;
  cardTitle: string;
  cardTitleDesc: string;
  module: string;
  controller: string;
  fields: FieldInfo[];
  formGroup: FormGroup | null;
}

export interface ValidationError {
  control: string;
  error: string;
  value: string;
}

const f: FieldInfo[] = [{
  name: '',
  title: '',
  type: FieldType.any,
  controls: []
}];

const ws: AWizardStep = {
  token: '',
  stepTitle: '',
  stepItems: {},
  tabPaneId: '',
  cardTitle: '',
  cardTitleDesc: '',
  module: '',
  controller: '',
  formGroup: null,
  fields: []
};

const wm: AWizardModel = {
  name: '',
  steps: []
}

export interface StepModel {
  token: string;
    stepTitle: string;
    stepItems: any;
    tabPaneId: string;
    cardTitle: string;
    cardTitleDesc: string;
    module: string;
    controller: string;
    formGroup: any;
    fields: FieldInfo[]
}

const fb = new FormBuilder();
const frm: FormGroup = fb.group({});
const bc = [{ label: '' }, { label: '', active: true }]

const d = {
  title: '',
  subTitle: '',
  fields: f,
  step: ws,
  wizardModel: wm,
  rowId: 0,
  rowData: null,
  form: frm
}

const s: ISessResp = {
  cd_token: '',
  ttl: 600,
  userId: null,
  jwt: null,
}

const as: IAppState = {
  success: false,
  info: null,
  sess: null,
  cache: null,
}

/**
 * for use in base model
 * to contain common items
 * whether component is
 * create, list, edit, or delet
 */
export interface BaseModelCtx {
  create?: object,
  list?: object,
  edit?: object,
  delete?: object
}

export class BaseModel {
  module = '';
  controller = '';
  token = '';
  jAppState = as;
  sess = s;
  data = d;
  breadCrumbItems: Array<{}> = bc;
  ctx: BaseModelCtx;
  controllerRoutes = {
    listRoute: '',
    editRoute: '',
    deleteRoute: '',
    createRoute: '',
  }
  constructor(module: string, controller: string) {
    this.init(module, controller);
  }

  init(module: string, controller: string) {
    this.module = module;
    this.controller = controller;
    this.controllerRoutes = {
      listRoute: `/${module}/${controller}/list`,
      editRoute: `/${module}/${controller}/edit`,
      deleteRoute: `/${module}/${controller}/delete`,
      createRoute: `/${module}/${controller}/create`,
    }
  }
}

// Validation Patterns
export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
export const URL_PATTERN = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'


