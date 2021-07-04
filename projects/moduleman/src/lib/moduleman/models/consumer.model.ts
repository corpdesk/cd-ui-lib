export interface Consumer {
    consumer_id?: number;
    consumer_name?: string;
    consumer_guid?: string;
    doc_id?: number;
    company_id?: number;
}

export interface ConsumerResource {
    consumer_resource_id?: number;
    consumer_resource_guid?: string;
    doc_id?: number;
    cd_obj_type_id?: number;
    enabled?: boolean;
    consumer_id?: number;
    obj_id?: number;
}