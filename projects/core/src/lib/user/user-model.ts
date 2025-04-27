export interface AuthData {
    userName: string;
    password: string;
    rememberMe: boolean,
    consumerGuid: string;
}

export interface IAuthData {
    userName: string;
    password: string;
    rememberMe?: boolean,
    consumerGuid: string;
}

export interface UserData {
    acoid: any;
    calndSumm: Array<any>;
    contacts: Array<any>;
    memoSumm: Array<any>;
    menuData: Array<any>;
    notifData: Array<any>;
    notifSumm: Array<any>;
    userData: Array<any>;
    pals: Array<any>;
}

export interface User {
    userId?: any;
    userGuid?: any;
    userName?: any;
    password?: any;
    email?: any;
    coId?: any;
    docId?: any;
    mobile?: any;
    gender?: any;
    dateobirth?: any;
    postalAddr?: any;
    fname?: any;
    mname?: any;
    lname?: any;
    national_id?: any;
    passport_id?: any;
    Trusted?: any;
    ZipCode?: any;
    ActivationKey?: any;
    ProfessionID?: any;
    avatar?: any;
    theme_id?: any;
    signature_id?: any;
    timezone_id?: any;
    lang_id?: any;
    designation_id?: any;
    company_id?: any;
    user_type_id?: any;
}

export class mUser {
    username: string;
    email: string;
    password: string;
    cPassword: string;
}

export class LoginModel {
    public username: string;
    public password: string;
    constructor(
    ) { }
}

export class RegModel {
    public fname: string;
    public lname: string;
    public email: string;
    public mobile: string;
    public username: string;
    public password: string;
    public cPassword: string;
    public company_id: string;
    constructor(
    ) { }
}

export interface Resp {
    app_state: any;
    data: any;
}

export class UserModel {
    userId?: number;
    userGuid?: string;
    userName: string;
    password?: string;
    email?: string;
    companyId?: number;
    docId?: number;
    mobile?: string;
    gender?: number;
    birthDate?: Date;
    postalAddr?: string;
    fName?: string;
    mName?: string;
    lName?: string;
    nationalId?: number;
    passportId?: number;
    userEnabled?: boolean;
    zipCode?: string;
    activationKey?: string;
    userTypeId?: number;
    userProfile?: string;

}


export interface IUserProfileAccess {
    userPermissions: IProfileUserAccess[],
    groupPermissions: IProfileGroupAccess[]
}

/**
 * Improved versin should have just one interface and 
 * instead of userId or groupId, cdObjId is applied.
 * This would then allow any object permissions to be set
 * Automation and 'role' concept can then be used to manage permission process
 */
export interface IProfileUserAccess {
    userId: number,
    hidden: boolean,
    field: string,
    read: boolean,
    write: boolean,
    execute: boolean
}

export interface IProfileGroupAccess {
    groupId: number,
    field: string,
    hidden: boolean,
    read: boolean,
    write: boolean,
    execute: boolean
}

export interface IUserProfile {
    fieldPermissions: IUserProfileAccess;
    avatar?: string; // URL or base64-encoded image
    userData: UserModel;
    areasOfInterest?: string[];
    bio?: string;
    affiliatedInstitutions?: string[];
    following?: string[]; // Limit to X entries (e.g., 1000) to avoid abuse
    followers?: string[]; // Limit to X entries (e.g., 1000)
    friends?: string[];   // Limit to X entries (e.g., 500)
    groups?: string[];    // Limit to X entries (e.g., 100)
}
