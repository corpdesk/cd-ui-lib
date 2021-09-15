import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { ServerService } from '@corpdesk/core/src/lib/base';
import { UserService, SessService } from '@corpdesk/core/src/lib/user';
// import { UserService } from '../../user/controllers/user.service';
import { DocModeOpts, ConversationItem, ConversationMeta, CommConversationSub, CommData } from './comm.model';
import { SocketIoService } from '@corpdesk/core/src/lib/cd-push';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommconversationService {
  UserData: any;
  postData: any;
  OutBoxData = [];
  InBoxData = [];
  InBoxDataPush = [];
  trayMode = 1; // Swithch Datasource: 1: OutBoxData, 2, InBoxData, 3, InBoxDataPush
  unreadMessages = [];
  countInBox = 0;
  countOutBox = 0;
  countUnread = 0;
  elInBox: any;
  elOutBox: any;
  subscribers: CommConversationSub[]; // conversation subscribers
  conversation: ConversationItem[] = [];
  conversationPush: ConversationItem[] = [];
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  selectedMessage: any;
  IntrayMeta: ConversationMeta = {
    pageHeader: null,
    showThread: null,
    labels: null,
    showLabels: null,
    flags: null,
    showFlags: null,
  };

  docModeInTray = true;
  docModeOutTray = false;
  docModeComposeDoc = false;
  docModeReadDoc = false;
  docModeReplyDoc = false;
  clickedCommConversationID = -1;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    public svUser: UserService,
    public svSocket: SocketIoService,
  ) {
    this.IntrayMeta.pageHeader = "View Message";
    this.pushSubscribe();
  }

  init() {
    this.trayMode = 1;
    this.inBox();
    this.outBox();
    this.elInBox = document.getElementById('memo-menu-inbox');
    this.elOutBox = document.getElementById('memo-menu-outbox');
    this.selectInbox();
  }

  // set all the events that compose-doc should listen to
  pushSubscribe() {
    this.svSocket.listen('response').subscribe(data => {
      console.log('Response received');
      console.log(data);
    });

    // this.svSocket.listen('broadcast-message').subscribe(data => {
    //   console.log('Response received');
    //   console.log(data);
    //   this.procPush(data, 'broadcast-message');
    // });

    this.svSocket.listen('session_confirm').subscribe(data => {
      console.log('Session is CONFIRMED');
      this.svSocket.emit('message', {
        sender_id: 'shivampip',
        session_id: 'shivampip',
        message: 'bye'
      });
    });
    this.svSocket.listen('connect').subscribe(data => {
      console.log('I am Connected to Socket server');
      this.svSocket.emit('session_request', { session_id: 'shivampip' });
    });
  }

  /**
   * Process pushed data
   * @param data 
   * @param scope 
   */
  procPush(data: any, scope: any) {
    const pushReq = data.req;
    const pushResp = data.resp;
    switch (scope) {
      case 'broadcast-message':
        if (pushReq.m == 'Comm' && pushReq.c == 'MemoController' && pushReq.a == 'actionInitComm') {
          if ('user_id exists in subscribers') {
            console.log('Before: count conversation:', this.conversation.length)
            // this.conversation.push(pushResp.data.outBox.conversation[0]);
            console.log('After: count conversation:', this.conversation.length)
          }
        }
        break;
      case 'private':
        // if scope is room, subscribe to room then emit
        this.svSocket.emit(scope, data);
        // if channel, subscribe to channel then send message
        break;
    }
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  /**
   * 
   * @param pushType // broadcast or private
   * @param scope // if private, room-name eg: conversation-guid as room-name
   * @param data // data to push
   */
  pushData(pushEvent: any, data: any) {
    switch (pushEvent) {
      case 'send-memo':
        this.svSocket.emit(pushEvent, data);
        break;
      case 'private':
        // if scope is room, subscribe to room then emit
        this.svSocket.emit(pushEvent, data);
        // if channel, subscribe to channel then send message
        break;
    }
  }



  selectInbox() {
    this.elInBox.classList.add('memo-menu-selected');
    this.elOutBox.classList.remove('memo-menu-selected');
  }

  selectOutbox() {
    this.elInBox.classList.remove('memo-menu-selected');
    this.elOutBox.classList.add('memo-menu-selected');
  }

  updateUnread() {
    this.unreadMessages = this.InBoxData.filter((m: any) => {
      if (m.attended == 0) {
        return m;
      }
    });
    this.countUnread = this.unreadMessages.length;
  }

  setMode(docMode: any, options: DocModeOpts) {
    console.log('this.conversation:', this.conversation);
    this.elInBox = document.getElementById('memo-menu-inbox');
    this.elOutBox = document.getElementById('memo-menu-outbox');
    switch (docMode) {
      case 'IN-TRAY':
        this.inBox();
        this.selectInbox();
        break;
      case 'OUT-TRAY':
        this.outBox();
        this.selectOutbox();
        break;
      case 'COMPOSE-DOC':
        this.docModeInTray = false;
        this.docModeOutTray = false;
        this.docModeComposeDoc = true;
        this.docModeReadDoc = false;
        this.docModeReplyDoc = false;
        break;
      case 'READ-DOC':

        this.getConversationObsv(this.clickedCommConversationID)
          .subscribe((ret: any) => {
            console.log('subscribe/ret:', ret);
            console.log('this.svUser.currentUser;:', this.svUser.currentUser);
            this.UserData = this.svUser.currentUser.userData;
            this.selectedMessage = ret.data.conversation;
            if(options.commconversation_id){
              this.clickedCommConversationID = options.commconversation_id;
            }
            this.docModeInTray = false;
            this.docModeOutTray = false;
            this.docModeComposeDoc = false;
            this.docModeReadDoc = true;
            this.docModeReplyDoc = false;
          });

        break;
      case 'REPLY-DOC':
        this.getConversationObsv(options.commconversation_id)
          .subscribe((ret: any) => {
            console.log('getConversationObsv/subscribe/ret:', ret);
            console.log('this.svUser.currentUser;:', this.svUser.currentUser);
            this.UserData = this.svUser.currentUser.userData;
            this.selectedMessage = ret.data.conversation;
            if(options.commconversation_id){
              this.clickedCommConversationID = options.commconversation_id;
            }
            this.subscribers = ret.data.subscribers;
            this.docModeInTray = false;
            this.docModeOutTray = false;
            this.docModeComposeDoc = false;
            this.docModeReadDoc = false;
            this.docModeReplyDoc = true;
          });

        break;
    }
  }

  inBox() {
    console.log('starting inBox()');
    this.ConversationInboxObsv()
      .subscribe((ret: any) => {
        console.log('subscribe/ret:', ret);
        this.conversation = ret.data.conversation;
        this.InBoxData = ret.data.conversation;
        console.log('this.InBoxData:', this.InBoxData)
        this.countInBox = this.InBoxData.length;
        this.docModeInTray = true;
        // this.docModeOutTray = false;
        this.docModeComposeDoc = false;
        this.docModeReadDoc = false;
        this.docModeReplyDoc = false;
        this.updateUnread();
      });
  }

  outBox() {
    this.ConversationOutBoxObsv()
      .subscribe((ret: any) => {
        console.log('subscribe/ret:', ret);
        this.conversation = ret.data.conversation;
        this.OutBoxData = ret.data.conversation;
        console.log('this.OutBoxData:', this.OutBoxData)
        this.countOutBox = this.OutBoxData.length;
        this.docModeInTray = true;
        // this.docModeOutTray = false;
        this.docModeComposeDoc = false;
        this.docModeReadDoc = false;
        this.docModeReplyDoc = false;
      });
  }

  ConversationInboxObsv() {
    console.log('starting ConversationInboxObsv()');
    this.setEnvelopeConversationInbox();
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }


  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "ConversationInbox",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "memo_type_id": 4
  //                 }
  //             }
  //         ],
  //         "token": "40054DD8-0A49-E008-B529-8DA674AD8542"
  //     },
  //     "args": null
  // }
  setEnvelopeConversationInbox() {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'ConversationInbox',
      dat: {
        f_vals: [
          {
            data: {
              memo_type_id: 4
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  getConversationObsv(commconversationID: any) {
    console.log('starting getConversationObsv()');
    this.setEnvelopeGetConversation(commconversationID);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server
    */
    return this.svServer.proc(this.postData);
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionGetConversation",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "memo_type_id": 4,
  //                     "commconversation_id": 99
  //                 }
  //             }
  //         ],
  //         "token": "40054DD8-0A49-E008-B529-8DA674AD8542"
  //     },
  //     "args": null
  // }
  setEnvelopeGetConversation(commconversationID: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionGetConversation',
      dat: {
        f_vals: [
          {
            data: {
              memo_type_id: 4,
              commconversation_id: commconversationID
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  demoSelectedConversation() {
    const conv = this.conversation;
    return conv.filter((conv: ConversationItem) => {
      if (conv.commconversation_id == this.clickedCommConversationID) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  /*
  * for initializing conversation eg new chat or new memo
  * otherwise use sendComm() to reply or contributng to existing conversation
  * works for any communication eg chat, memo, doc comments
  * 
  */
  initCommObsv(initCommData: CommData) {
    console.log('starting getConversationObsv()');
    this.setEnvelopeInitComm(initCommData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionInitComm",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "subject": "fgve",
  //                 "commconversationsub": [
  //                     {
  //                         "user_id": 1010,
  //                         "sub_type_id": 1
  //                     },
  //                     {
  //                         "user_id": 1002,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1003,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1011,
  //                         "sub_type_id": 3
  //                     },
  //                     {
  //                         "user_id": 1015,
  //                         "sub_type_id": 4
  //                     }
  //                 ],
  //                 "data": {
  //                     "memo_message": "hujk gfr",
  //                     "attachment_id": null,
  //                     "memo_type_id": 4,
  //                     "memo_draft": null
  //                 }
  //             }
  //         ],
  //         "token": "9EA92E8F-AECC-559F-DBCC-BE66BE272FE8"
  //     },
  //     "args": null
  // }
  setEnvelopeInitComm(initCommData: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionInitComm',
      dat: {
        f_vals: [
          initCommData
        ],
        token: this.svSess.token
      },
      args: null
    };
  }

  getEnvelopeInitComm(initCommData: any) {
    return {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionInitComm',
      dat: {
        f_vals: [
          initCommData
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  /*
  * for flaging memo as 'read'
  */
  flagOpenMemoObsv(docID: any) {
    console.log('starting flagOpenMemoObsv()');
    this.setEnvelopeFlagOpenMemo(docID);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }
  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionFlagOpenMemo",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "doc_id": 10258
  //                 }
  //             }
  //         ],
  //         "token": "050D1CF3-BFCB-1B99-80A2-501FECEFF53C"
  //     },
  //     "args": null
  // }
  setEnvelopeFlagOpenMemo(docID: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionFlagOpenMemo',
      dat: {
        f_vals: [
          {
            "data": {
              "doc_id": docID
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  /*
  * for initializing conversation eg new chat or new memo
  * otherwise use sendComm() to reply or contributng to existing conversation
  * works for any communication eg chat, memo, doc comments
  * 
  */
  replyCommObsv(replyCommData: CommData) {
    console.log('starting getConversationObsv()');
    this.setEnvelopeReplyComm(replyCommData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "actionInitComm",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "subject": "fgve",
  //                 "commconversationsub": [
  //                     {
  //                         "user_id": 1010,
  //                         "sub_type_id": 1
  //                     },
  //                     {
  //                         "user_id": 1002,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1003,
  //                         "sub_type_id": 7
  //                     },
  //                     {
  //                         "user_id": 1011,
  //                         "sub_type_id": 3
  //                     },
  //                     {
  //                         "user_id": 1015,
  //                         "sub_type_id": 4
  //                     }
  //                 ],
  //                 "data": {
  //                     "memo_message": "hujk gfr",
  //                     "attachment_id": null,
  //                     "memo_type_id": 4,
  //                     "memo_draft": null
  //                 }
  //             }
  //         ],
  //         "token": "9EA92E8F-AECC-559F-DBCC-BE66BE272FE8"
  //     },
  //     "args": null
  // }
  setEnvelopeReplyComm(replyCommData: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionReplyComm',
      dat: {
        f_vals: [
          replyCommData
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  ConversationOutBoxObsv() {
    console.log('starting ConversationOutBoxObsv()');
    this.setEnvelopeConversationOutBox();
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  //   {
  //     "ctx": "Sys",
  //     "m": "Comm",
  //     "c": "MemoController",
  //     "a": "ConversationInbox",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "memo_type_id": 4
  //                 }
  //             }
  //         ],
  //         "token": "40054DD8-0A49-E008-B529-8DA674AD8542"
  //     },
  //     "args": null
  // }
  setEnvelopeConversationOutBox() {
    this.postData = {
      ctx: 'Sys',
      m: 'Comm',
      c: 'MemoController',
      a: 'actionOutBox',
      dat: {
        f_vals: [
          {
            data: {
              memo_type_id: 4
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  dynamicSort(property: any) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}
