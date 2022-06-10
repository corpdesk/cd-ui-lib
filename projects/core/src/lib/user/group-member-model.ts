import { Group } from './group-model';

export interface GroupMember {
    group_member_id?: number;
    group_member_guid?: string;
    group_member_type?: string;
    group_guid_parent?: string;
    member_guid?: string;
    user_id_member?: number;
    doc_id?: number;
    temp?: boolean;
    cd_obj_type_id?: number;
    group_member_parent_id?: number;
    enabled?: boolean;
}

export interface GroupMemberInput {
    group: Group;
    data: GroupMember;
}

export interface GroupMemberNode {
    member_name: string;
    group_member_id: number;
    member_guid: string;
    group_guid_parent: string;
    cd_obj_type_id: number;
    children: GroupMemberNode[];
}