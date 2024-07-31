import { ICdRequest, ICdResponse, ICommConversationSub } from '../base';
// data structure for sending data to push server for dispatch
// export interface CdPushEnvelop {
//     pushRecepients: any;
//     pushData:any;
//     triggerEvent: string;
//     emittEvent: string | null;
//     req: ICdRequest | null;
//     resp: ICdResponse | null;
// }

export const DEFAULT_PUSH_RECEPIENTS: ICommConversationSub[] = [
    {
        userId: 0, // subscriber userId
        subTypeId: 7, // type of subscriber
        commconversationId: -1,
        cdObjId: null
    }
]