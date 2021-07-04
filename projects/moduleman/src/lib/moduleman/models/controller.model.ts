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
export class CdController {
    cd_obj_id: number;
    cd_obj_guid: string;
    cd_obj_name: string;
    cd_obj_type_guid: string;
    last_sync_date: string;
    last_modification_date: string;
    parent_module_guid: string;
    parent_class_guid: string;
    parent_obj: string;
    cd_obj_disp_name: string;
    cd_obj_type_id: number;
    cd_obj_type_name: string;
    module_name: string;
    show_name: string;
    icon: string;
    show_icon: string;
    curr_val: string
}

export class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}