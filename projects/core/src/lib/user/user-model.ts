export interface AuthData {
    user_name: string;
    password: string;
    rememberMe: boolean,
    consumer_guid: string;
}

export interface IAuthData {
    user_name: string;
    password: string;
    rememberMe?: boolean,
    consumer_guid: string;
}

export interface UserData {
    acoid: any;
    calnd_summ: Array<any>;
    contacts: Array<any>;
    memo_summ: Array<any>;
    menu_data: Array<any>;
    notif_data: Array<any>;
    notif_summ: Array<any>;
    user_data: Array<any>;
    pals: Array<any>;
}

export interface User {
    user_id?: any;
    user_guid?: any;
    user_name?: any;
    password?: any;
    email?: any;
    co_id?: any;
    doc_id?: any;
    mobile?: any;
    gender?: any;
    dateobirth?: any;
    postal_addr?: any;
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
