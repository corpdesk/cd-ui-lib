

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

export const numericNumberReg1 = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
export const numericNumberReg2 = '/^[0-9]\d*$/';
export const numericNumberReg3 = new RegExp(/^-?[0-9]\\d*(\\.\\d{1,2})?$/, 'i')
export const numericNumberReg4 = new RegExp(/^[0-9]\d*$/, 'i')

