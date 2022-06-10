import { FormGroup } from "@angular/forms";
import { DEFAULT_CD_OBJ_ID, DEFAULT_COMM_TRACK, ICdPushEnvelop, ICdRequest, ICdResponse, ICommConversationSub } from "./IBase";

const cdToken = '3ffd785f-e885-4d37-addf-0e24379af338';
export const commSubscribers: ICommConversationSub[] = [
  {
    userId: 1010,
    subTypeId: 1,
    cdObjId: DEFAULT_CD_OBJ_ID
  },
  {
    userId: 1010,
    subTypeId: 7,
    cdObjId: DEFAULT_CD_OBJ_ID
  }
];

export const res: ICdResponse = {
  app_state: {
    success: true,
    info: { messages: [], code: '', app_msg: 'Welcome karl!' },
    sess: {
      cd_token: 'dd8922dd-48ce-40e7-b470-df6129005aca',
      userId: 1010,
      jwt: {
        jwtToken: '',
        checked: false,
        checkTime: null,
        authorized: false,
        ttl: -1,
      },
      ttl: 600,
      initUuid: 'f140da1f-2c46-4e6e-88ea-4f49d11e59ce',
      initTime: '1643282575.498'
    },
    cache: {},
    sConfig: {
      usePush: true,
      usePolling: true,
      useCacheStore: true
    }
  },
  data: []
};

export const pushEnvelop: ICdPushEnvelop = {
  pushData: {
    m: '',
    pushGuid: '',
    pushRecepients: commSubscribers,
    triggerEvent: '',
    emittEvent: '',
    token: '',
    commTrack:DEFAULT_COMM_TRACK
  },
  // msg: sendData.controls['msg'].value,
  // userId: sendData.controls['userId'].value,
  // destination: sendData.controls['destination'].value,

  // t: Number(new Date()),
  // relayed: false,
  // delivered: false,

  req: null,
  resp: res,
}

export function setEnvelopeSendComm(msg: string, commSubscribers: ICommConversationSub[]): ICdRequest {
  const q = {
    subject: 'test subject',
    commconversationsub: commSubscribers,
    // commconversationsub: [
    //   {
    //     userId: 1010,
    //     subTypeId: 1
    //   },
    //   {
    //     userId: 1002,
    //     subTypeId: 7
    //   },
    //   {
    //     userId: 1003,
    //     subTypeId: 7
    //   },
    //   {
    //     userId: 1011,
    //     subTypeId: 3
    //   },
    //   {
    //     userId: 1015,
    //     subTypeId: 4
    //   }
    // ]
  }
  return {
    ctx: 'Sys',
    m: 'Comm',
    c: 'MemoController',
    a: 'actionInitComm',
    dat: {
      f_vals: [
        {
          query: q,
          data: {
            memoMessage: msg,
            attachmentId: null,
            memoTypeId: 4,
            memoDraft: null
          }
        }
      ],
      token: cdToken
    },
    args: null
  };
}

// const recepients = pushEnvelop.pushData.pushRecepients;
// const senderId = recepients.filter((m) => {m.subTypeId === 1});
