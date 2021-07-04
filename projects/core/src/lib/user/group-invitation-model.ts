export interface GroupInvitation {
    group_invitation_id?: number;
    group_invitation_guid?: string;
    group_invitation_name?: string;
    group_invitation_description?: string;
    group_id?: number;
    hostUser?: number;
    guestUser?: number;
    accept?: boolean;
    doc_id?: number;
    group_invitation_type_id?: number;
    left?: boolean
}

/**
 * INVITATION TYPES
 */
export class GroupInvitationTypes {
    public static USER_PALS = 1313;
    public static USER_CUSTOM = 1314;
    public static APP_CUSTOM = 1315;
}


