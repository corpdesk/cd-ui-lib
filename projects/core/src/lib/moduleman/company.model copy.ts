// import { Validators } from "@angular/forms";
// import { ActionType, AWizardModel, ControlType, DdlCtx, DdlData, EMAIL_PATTERN, FieldFor, FieldInfo, FieldType, FormsService, IQuery, URL_PATTERN } from "@corpdesk/core";
// import { of } from "rxjs";

// const svForms = new FormsService();

// // DB FIELDS: consumer_id, consumer_name, consumer_guid, company_id, company_guid, consumer_enabled


// export const ConsumerModel: FieldInfo[] = [
//     { title: 'ID', name: 'consumerId', dbName: 'consumer_id', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'alphanum' },
//     { title: 'Guid', name: 'consumerGuid', dbName: 'consumer_guid', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'alphanum', disabled: true },
//     { title: 'Name', name: 'consumerName', dbName: 'consumer_name', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(60), Validators.required]] },    
//     { title: 'Company', name: 'companyId', dbName: 'company_id', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.searchDropDown, fieldFor: FieldFor.createForm }], ddlInfo: { selData$: of([]), selValueField: 'companyName', selIndex: 'companyId', selPlaceholder: '...Choose', data: null }, formatt: 'text', disabled: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(42), Validators.required]] },  
//     { title: 'Enabled', name: 'consumerEnabled', dbName: 'consumer_enabled', type: FieldType.boolean, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.status, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true },
//     { title: 'Action', name: 'action', type: FieldType.action, fetchable: false, show: true, controls: [{ controlType: ControlType.action, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.action, fieldFor: FieldFor.createForm }], Fn: 'createConsumer' },
//     { title: 'Search', name: 'iconSearch', type: FieldType.any, controls: [], formControlsConfig: ['', []] }
// ]

// export const DEFAULT_INSERTABLE_CONSUMER: any = {
//     data: {},
//     valid: null,
//     ctx: 'Sys'
// }

// export interface IConsumerModel {
//     consumerId?: number;
//     consumerGuid?: string;
//     consumerName?: string;
//     consumerTypeGuid?: string;
//     postalAddress?: string; 
//     phone?: string; 
//     email?: string;
//     website?: string;
//     physicalLocation?: string;
//     city?: string;
//     country?: string;
//     logo?: string;
//     consumerEnabled?: boolean;
//     searchTags?: string;
// }

// export const CONSUMER_STEP_MODEL = {
//     token: '',
//     stepTitle: 'Create Consumer',
//     stepItems: { nextButtonId: 'stepToMenu' }, // to be automated
//     tabPaneId: 'consumerInfo',
//     cardTitle: 'Consumer Information',
//     cardTitleDesc: 'Fill all information below',
//     module: 'Moduleman',
//     controller: 'Consumer',
//     formGroup: null,
//     fields: svForms.filterByFieldFor(ConsumerModel, FieldFor.createForm),
// }

// export const ConsumerWizardModel: AWizardModel = {
//     name: 'Consumer Wizard',
//     steps: [
//         CONSUMER_STEP_MODEL
//     ]
// }

// // DROPDOWN MODEL
// export const consumerGetQuery: IQuery = {
//     select: ['consumerId', 'consumerName', 'consumerGuid'],
//     where: {}
// }

// export const consumerDdlCtx: DdlCtx = {
//     getFn$: null,
//     selIndex: consumerGetQuery.select![0],
//     selValueField: consumerGetQuery.select![1],
//     fetchFields: consumerGetQuery.select!,
//     step: null,
//     token: null,
//     controlName: 'consumerId',
// };

// /////////////
// export const consumerTypeGetQuery: IQuery = {
//     select: ['consumerTypeId', 'consumerTypeName', 'consumerTypeGuid'],
//     where: {}
// }
// export const consumerTypeDdlCtx: DdlCtx = {
//     getFn$: null,
//     selIndex: consumerTypeGetQuery.select![2],
//     selValueField: consumerTypeGetQuery.select![1],
//     fetchFields: consumerTypeGetQuery.select!,
//     step: null,
//     token: null,
//     controlName: 'consumerTypeGuid',
// };

// export const DEFAULT_DDLD: DdlData[] = [
//     {
//         menuName: 'create',
//         menuGuid: 'bd9b5bda5ab',
//         navLocation: '/moduleman/consumer/create',
//         actionType: ActionType.navigate,
//     },
//     {
//         menuName: 'dashboard',
//         menuGuid: 'd27294db59c1',
//         navLocation: '/moduleman/consumer/dashboard',
//         actionType: ActionType.navigate
//     }
// ];

import { Validators } from "@angular/forms";
import { FieldType, IQuery } from '../base';
import { ActionType, AWizardModel, ControlType, DdlCtx, DdlData, EMAIL_PATTERN, FieldFor, FieldInfo, FormsService, URL_PATTERN } from "../guig";
import { of } from "rxjs";

const svForms = new FormsService();

// DB FIELDS: company_id, company_guid, company_name, postal_address, phone, email, website, physical_location, city, country, logo, company_enabled, search_tags

export const CompanyModel: FieldInfo[] = [
    { title: 'ID', name: 'companyId', dbName: 'company_id', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'alphanum' },
    { title: 'Guid', name: 'companyGuid', dbName: 'company_guid', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'alphanum', disabled: true },
    { title: 'Name', name: 'companyName', dbName: 'company_name', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(80), Validators.required]] },
    { title: 'Tags', name: 'searchTags', dbName: 'search_tags', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.textArea, fieldFor: FieldFor.createForm }], formatt: 'text', isNameField: true, savable: true, formControlsConfig:['', [Validators.minLength(0), Validators.maxLength(300)]] },   
    { title: 'CompanyType', name: 'companyTypeGuid', dbName: 'company_type_guid', type: FieldType.string, fetchable: true, updateable: true, index: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.searchDropDown, fieldFor: FieldFor.createForm }], ddlInfo: { selData$: of([]), selValueField: 'companyName', selIndex: 'companyTypeGuid', selPlaceholder: '...Choose', data: null }, formatt: 'text', disabled: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(42), Validators.required]] },
    { title: 'Postal', name: 'postalAddress', dbName: 'postal_address', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(1), Validators.maxLength(20), Validators.required]] },
    { title: 'Phone', name: 'phone', dbName: 'phone', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(8), Validators.maxLength(80), Validators.required]] },
    { title: 'Mobile', name: 'mobile', dbName: 'mobile', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(8), Validators.maxLength(24), Validators.required]] },
    { title: 'Email', name: 'email', dbName: 'email', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.pattern(EMAIL_PATTERN), Validators.required]] },
    { title: 'Website', name: 'website', dbName: 'website', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.pattern(URL_PATTERN), Validators.required]] },  
    { title: 'City', name: 'city', dbName: 'city', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.required]] },
    { title: 'Country', name: 'country', dbName: 'country', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.required]] },
    { title: 'Location', name: 'physicalLocation', dbName: 'physical_location', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(1), Validators.maxLength(80), Validators.required]] },
    { title: 'Logo', name: 'logo', dbName: 'logo', type: FieldType.string, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.text, fieldFor: FieldFor.createForm }, { controlType: ControlType.text, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true, formControlsConfig: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.required]] },
    { title: 'Enabled', name: 'companyEnabled', dbName: 'company_enabled', type: FieldType.boolean, fetchable: true, updateable: true, searchable: true, show: true, controls: [{ controlType: ControlType.status, fieldFor: FieldFor.tableDisplay }], formatt: 'text', isNameField: true, savable: true },
    { title: 'Action', name: 'action', type: FieldType.action, fetchable: false, show: true, controls: [{ controlType: ControlType.action, fieldFor: FieldFor.tableDisplay }, { controlType: ControlType.action, fieldFor: FieldFor.createForm }], Fn: 'createCompany' },
    { title: 'Search', name: 'iconSearch', type: FieldType.any, controls: [], formControlsConfig: ['', []] }
]

export const DEFAULT_INSERTABLE_COMPANY: any = {
    data: {},
    valid: null,
    ctx: 'Sys'
}

export interface ICompanyModel {
    companyId?: number;
    companyGuid?: string;
    companyName?: string;
    companyTypeGuid?: string;
    postalAddress?: string; 
    phone?: string; 
    email?: string;
    website?: string;
    physicalLocation?: string;
    city?: string;
    country?: string;
    logo?: string;
    companyEnabled?: boolean;
    searchTags?: string;
}

export const COMPANY_STEP_MODEL = {
    token: '',
    stepTitle: 'Create Company',
    stepItems: { nextButtonId: 'stepToMenu' }, // to be automated
    tabPaneId: 'companyInfo',
    cardTitle: 'Company Information',
    cardTitleDesc: 'Fill all information below',
    module: 'Moduleman',
    controller: 'Company',
    formGroup: null,
    fields: svForms.filterByFieldFor(CompanyModel, FieldFor.createForm),
}

export const CompanyWizardModel: AWizardModel = {
    name: 'Company Wizard',
    steps: [
        COMPANY_STEP_MODEL
    ]
}

// DROPDOWN MODEL
export const companyGetQuery: IQuery = {
    select: ['companyId', 'companyName', 'companyGuid'],
    where: {}
}
export const companyDdlCtx: DdlCtx = {
    getFn$: null,
    selIndex: companyGetQuery.select![0],
    selValueField: companyGetQuery.select![1],
    fetchFields: companyGetQuery.select!,
    step: null,
    token: null,
    controlName: 'companyId',
};

/////////////
export const companyTypeGetQuery: IQuery = {
    select: ['companyTypeId', 'companyTypeName', 'companyTypeGuid'],
    where: {}
}
export const companyTypeDdlCtx: DdlCtx = {
    getFn$: null,
    selIndex: companyTypeGetQuery.select![2],
    selValueField: companyTypeGetQuery.select![1],
    fetchFields: companyTypeGetQuery.select!,
    step: null,
    token: null,
    controlName: 'companyTypeGuid',
};

export const COMPANY_DEFAULT_DDLD: DdlData[] = [
    {
        menuName: 'create',
        menuGuid: 'bd9b5bda5ab',
        navLocation: '/moduleman/company/create',
        actionType: ActionType.navigate,
    },
    {
        menuName: 'dashboard',
        menuGuid: 'd27294db59c1',
        navLocation: '/moduleman/company/dashboard',
        actionType: ActionType.navigate
    }
];




