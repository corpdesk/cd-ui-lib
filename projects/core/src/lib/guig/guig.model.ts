import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldType, IQuery } from '@corpdesk/core/src/lib/base';

export enum ControlType {
  input = 0,
  text = 1,
  textArea = 2,
  psswdText = 3,
  select = 4,
  selectMultiple = 5,
  dropDown = 6,
  searchDropDown = 7,
  radioButton = 8,
  dualRaido = 9,
  dualSwitch = 10,
  checkBox = 11,
  toggleSwitch = 12,
  ngToggle = 13,
  rangeInput = 14,
  dateSelector = 15,
  upload = 16,
  action = 17,
  status = 18,
}

export interface FieldInfo {
  title: string;
  name: string;
  type?: FieldType;
  index?: boolean;
  dbName?: string;
  searchable?: boolean;
  fetchable?: boolean;
  savable?: boolean;
  disabled?: boolean;
  show?: boolean;
  controlType: ControlType;
  controlData?: any[];
  formatt?: string;
  isNameField?: boolean;
  ActionType?: ActionType;
  Fn?: string;
}

export interface SelectData {
  value: string;
  text: string;
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

export interface DdlData {
  menuName: string;
  menuGuid: string;
  navLocation: string;
  actionType: ActionType;
  fn?: string;
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
  controlType: string;
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
  stepTitle: string;
  tabPaneId: string;
  cardTitle: string;
  cardTitleDesc: string;
  module: string;
  controller: string;
  fields: FieldInfo[];
  formGroup: FormGroup|null;
}
