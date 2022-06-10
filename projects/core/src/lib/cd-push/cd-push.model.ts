import { ICdRequest, ICdResponse } from '@corpdesk/core/src/lib/base';
// data structure for sending data to push server for dispatch
export interface CdPushEnvelop {
    pushRecepients: any;
    pushData:any;
    triggerEvent: string;
    emittEvent: string | null;
    req: ICdRequest | null;
    resp: ICdResponse | null;
}

export const DEFAULT_PUSH_RECEPIENTS = [{ user_id: 0, sub_type_id: 7 }]