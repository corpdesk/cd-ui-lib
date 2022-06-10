export interface DocModeOpts {
    commconversation_id?: number | null;
}

export interface MemoSummary {
    attachment_guid?: string;
    attachment_id?: number;
    attended?: number;
    commatt_user_id?: number;
    commattended_id?: number;
    commconversation_id?: number;
    commconversationsub_accepted?: number;
    commconversationuser_id?: number;
    commconversationsub_invited?: number;
    commsub_type_name?: string;
    doc_date?: string;
    doc_from?: number;
    doc_id?: number;
    doc_type?: number;
    doctyp_id?: number;
    memo_guid?: string;
    memo_id?: number;
    memo_message?: string;
    memo_type_id?: number;
    memo_type_name?: string;
    sender_avatar?: string;
    sender_fname?: string;
    sender_lname?: string;
    sender_mname?: string;
    sender_user_id?: number;
    sender_user_name?: number;
    sub_avatar?: number;
    sub_fname?: string;
    sub_lname?: string;
    sub_mname?: string;
    sub_type_id?: number;
    sub_user_id?: number;
    sub_username?: string;
    subject?: string;
    user_id?: number;
}

export interface ConversationItem {
    memo_id?: number;
    memo_message?: string;
    doc_id?: number;
    memo_type_id?: number;
    commconversationuser_id?: number;
    commconversation_id?: number;
    user_id?: number;
    commconversationsub_invited?: number;
    commconversationsub_accepted?: number;
    sub_type_id?: number;
    memo_guid?: string;
    memo_type_name?: string;
    subject?: string;
    doc_date?: string;
    doc_type?: number;
    attachment?: boolean;
    attachment_id?: number;
    attachment_guid?: string;
    doctyp_id?: number;
    doc_from?: number;
    commsub_type_name?: string;
    sub_user_id?: number;
    sub_username?: string;
    sub_fname?: string;
    sub_mname?: string;
    sub_lname?: string;
    sub_name?: string;
    sub_avatar?: string;
    sender_user_id?: number;
    sender_user_name?: string;
    sender_fname?: string;
    sender_mname?: string
    sender_lname?: string;
    sender_name?: string;
    sender_email?: string;
    sender_mobile?: string;
    sender_avatar?: string;
    attended?: any;
    commattended_id?: number;
    commatt_user_id?: number;
    selected?: boolean;
    flag?: object;
    memo_draft?: boolean;
    commconversationsub_id?:number;
    sub_email?: string;
    sub_mobile?: string;
}

export interface ConversationMeta {
    pageHeader?: string | null;
    showThread?: boolean | null;
    labels?: any | null;
    showLabels?: boolean | null;
    flags: any;
    showFlags?: boolean | null;
}

// converstiaon subscriber
/* 
*  possible sub_type_id values
*       '1','sender_user'
*       '2','recepient_group'
*       '3','cc_user'
*       '4','bcc_user'
*       '5','cc_group'
*       '6','bcc_group'
*       '7','recepient_user'
*       '8','fwd_user'
*       '9','fwd_group'
*/
export interface CommConversationSub {
    user_id: number; // subscriber user_id
    sub_type_id: number; // type of subscriber
    commconversation_id?: number;
    commconversationsub_id?: number;
    commconversationsub_invited?: boolean;
    commconversationsub_accepted?: boolean;
}

/**
 * CommData:
 * structure of data for sending 
 * initComm, reply etc
 */
export interface CommData {
    pushRecepients?: any;
    emittEvent?: any;
    subject: string;
    commconversationsub: any;
    data: ConversationItem;
}

export interface CdSocialPost {
    cd_social_post_id?: number;
    cd_social_post_guid?: string;
    cd_social_post_name?: string;
    cd_social_post_description?: string;
    doc_id?: number;
    ext?: any;
    cd_social_post_type_id?: number;
    cd_social_post_img?: string;
    cd_social_post_likes?: number;
}


