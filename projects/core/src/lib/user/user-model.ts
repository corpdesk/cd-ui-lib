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
