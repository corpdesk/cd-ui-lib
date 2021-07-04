export interface UpdateFilterItem {
    field: string;
    operator: string;
    val: string;
}

// format for querying search via corpdesk api
export interface CdFilter {
    field?: string;
    operator: string;
    val?: any;
    fieldType?: string;
    jField?: string;
    jPath?: string; // example "$.user_id"
    jVal?: any;
}



export const ENDPOINT_APPS = `http://${window.location.host}/`;

export interface EnvConfig {
    production: boolean;
    apiEndpoint: string;
    consumerToken: string;// current company consumer
    USER_RESOURCES: string;
    HOST: string;
    consumer: string;
    clientAppId: number; // this client application identifies itself to the server with this id
    SOCKET_IO_PORT: number; // push server port
}

export interface PostData {
    ctx: string;
    m: string;
    c: string;
    a: string;
    dat: {
        token: string;
    },
    args: any;
}

// export interface CdResponse {
//     app_state: {
//         success: boolean;
//         info: {
//             messages: string;
//             code: number;
//             app_msg: [];
//         },
//         sess: any;
//         cache: { dat_scope: number }
//     };
//     data: [];
// }

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
