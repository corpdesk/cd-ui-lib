
export class MenuModel {
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
  title?:string;
}

export interface SubMenu {
  title?: string;
  link?: string;
  enabled?: boolean;
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
