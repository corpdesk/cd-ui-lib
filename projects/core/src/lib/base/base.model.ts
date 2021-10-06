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


