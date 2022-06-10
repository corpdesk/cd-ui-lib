/*
interface for gui modules
*/
export interface ModuleData {
    path: string;
    location: string;
    moduleName: string;
    rootComponent?: string;
    description: string;
    registered?: boolean;
}

/*
interface for api modules
*/
export class CdModule {
    module_id: number;
    module_guid: string;
    module_name: string;
    module_description: string;
    is_public: boolean;
    is_sys_module: boolean;
    doc_id: number;
    enabled: string;
    last_modification_date: string;
    group_guid: string;
    group_name: string;
    group_owner_id: number;
    group_type_id: number;
    company_id: number;
}

export class Menu {
    menu_id: number;
    menu_name: string;
    menu_icon: string;
    menu_guid: string;
    registered: boolean;
    location: string;
    menu_action_id: number;
    doc_id: string;
    menu_parent_id: string;
    menuOrder: number;
    path: string;
    description: string;
    module_id: number;
    moduleTypeID: number;
    module_guid: string;
    module_name: string;
    moduleName: string;
    is_public: boolean;
    is_sys_module: boolean;
    cd_obj_id: number;
    cd_obj_name: string;
    last_sync_date: string;
    cd_obj_disp_name: string;
    cd_obj_guid: string;
    cd_obj_type_guid: string;
    last_modification_date: string;
    parent_module_guid: string;
}

/*
interface for api consumer
*/
export class Consumer {
    consumer_id: number;
    consumer_name: string;
    consumer_guid: string;
    doc_id: number;
    company_id: number
}

/*
interface for api consumer resource
*/
export class ConsumerResource {
    consumer_resource_id: number;
    consumer_resource_guid: string;
    doc_id: number;
    cd_obj_type_id: number;
    active: boolean;
    consumer_id: number;
    obj_id: number;
}

/*
interface for api company
*/
export class CdCompany {
    company_type_id: number;
    DirectoryCategory_ID: number;
    company_name: string;
    PostalAddress: string;
    Phone: string;
    E_mail: string;
    Website: string;
    Physical_Location: string;
    Town: string;
    Country: string;
    AreaOfSpecialization: string;
    Logo: string;
    Fax: string;
    Password: string;
    Trusted: string;
    doc_id: number;
    town_id: number;
    county_id: number;
    company_guid: number;
    company_description: string;
    parent_id: number;
}

export class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}