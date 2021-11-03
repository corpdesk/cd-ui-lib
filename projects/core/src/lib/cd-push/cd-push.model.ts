import { CdRequest, CdResponse } from '@corpdesk/core/src/lib/base';
// data structure for sending data to push server for dispatch
export interface CdPushEnvelop {
    pushRecepients: any;
    pushData:any;
    triggerEvent: string;
    emittEvent: string | null;
    req: CdRequest | null;
    resp: CdResponse | null;
}