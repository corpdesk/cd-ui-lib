// import { Observable } from 'rxjs';

/**
 * @path // the path of the controller relative to the BaseService file
 * @clsName // class name
 * @action // class method to invoke
 */

 export interface EnvConfig {
    production: boolean;
    apiEndpoint: string;
    consumerToken: string;// current company consumer
    USER_RESOURCES: string;
    HOST: string;
    CD_PORT?: number; // optional setting for apiEndpoint
    consumer: string;
    clientAppId: number; // this client application identifies itself to the server with this id
    SOCKET_IO_PORT: number; // push server port
}

export interface CdResponse {
    app_state: {
        success: number;
        info: {
            messages: string;
            code: number;
            app_msg: any;
        };
        sess: {
            cd_token: string;
            jwt: string;
            p_sid: string;
            ttl: number;
        };
        cache: object;
    };
    data: [];
}


// cd request format
export interface CdRequest {
    ctx: string;
    m: string;
    c: string;
    a: string;
    dat: object;
    args: object;
}

// cd response format
export interface CdResponse {
    app_state: {
        success: number;
        info: {
            messages: string;
            code: number;
            app_msg: any;
        };
        sess: {
            cd_token: string;
            jwt: string;
            p_sid: string;
            ttl: number;
        };
        cache: object;
    };
    data: [];
}

export interface IControllerContext {
    path: string;
    clsName: string;
    action: string;
}

export interface IModelRules {
    create: object;
    update: object;
    remove: object;
}

// cd request format
export interface ICdRequest {
    ctx: string;
    m: string;
    c: string;
    a: string;
    dat: any;
    args: object;
}

export interface ICdResponse {
    app_state: IAppState;
    data: object;
}

export interface IAppState {
        success: boolean;
        info: IRespInfo | null;
        sess: ISessResp | null;
        cache: object | null;
}

export interface ISessResp {
    cd_token?: string | null;
    jwt?: string | null;
    ttl: number;
}

export interface IRespInfo {
    messages: string[];
    code: string | null;
    app_msg: string  | null;
}

export interface ICdPushEnvelop {
    pushRecepients: any;
    triggerEvent: string;
    emittEvent: string;
    req: ICdRequest;
    resp: ICdResponse;
    pushData?: any;
}

export interface IServiceInput {
    serviceModel: any;
    serviceModelInstance?: any;
    docName?: string;
    cmd?: any;
    data?: any;
    dSource?: number;
}

export interface IDoc {
    doc_id?: number;
    doc_guid?: string;
    doc_name?: string;
    doc_description?: string;
    company_id?: number;
    doc_from: number;
    doc_type_id: number;
    doc_date?: Date;
    attach_guid?: string;
    doc_expire_date?: Date;
}

export type ClassRef = new (...args: any[]) => any;
export type Fn = () => void;

export interface IUser {
    userID: number;
    userGUID: string;
    userName: string;
}
export interface IBase {
    cdToken: string;
    cRules: object;
    uRules: object;
    dRules: object;
}

export interface ICommConversationSub {
    user_id: number; // subscriber user_id
    sub_type_id: number; // type of subscriber
    commconversation_id?: number;
    commconversationsub_id?: number;
    commconversationsub_invited?: boolean;
    commconversationsub_accepted?: boolean;
}

export interface IAclCtx {
    memberGuid: string;
    moduleGroupGuid: any;
    consumerId: number;
    moduleName: string;
    currentUser: any,
    module: any,
}

export interface IQuery{
    select: string [];
    where: object;
    take: number;
    skip: number;
}






