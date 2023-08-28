import { Injectable, Input, Inject, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService, ICdResponse,EnvConfig, CdFilter, ServerService } from '@corpdesk/core/src/lib/base';
import { User, UserData, IAuthData } from './user-model';
import { SocketIoService, CdPushEnvelop } from '@corpdesk/core/src/lib/cd-push';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // env: EnvConfig;
  private postData: any;
  cd_token: string | undefined = '';
  userData: User[] = [];
  cuid = '';
  userName = '';
  fullName = '';
  contacts = [];
  allUsers = [];
  cuidAvatar = '';
  currentUser: any;
  currentProfile: any = { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' };
  pals: any;
  public usersData$: Observable<UserData[]>;
  // CdResponse
  public userDataResp$: Observable<any>;
  isInvalidSelUsers = true;
  selectedUsers: User[] = [];

  constructor(
    private svAppState: AppStateService,
    private svServer: ServerService,
    // private svMenu: MenuService,
    // private svNotif: NotificationService,
    // private svMessages: MessagesService,
    public svSocket: SocketIoService,
    @Inject('env') private env: EnvConfig,
  ) {
    console.log('core/UserService::constructor()/this.env:', this.env);
    // this.currentProfile.name = 'Login/Register';
    // this.currentProfile.picture = 'assets/cd/branding/coop/avatarCircle.svg';
  }

  // init(env: EnvConfig){
  //   this.env = env;
  // }

  /*
    set userData
    set contacts
    */
  // init(res: any) {
  //   console.log('starting UserService::init()');
  //   if (res) {
  //     console.log('UserService::init()/res:', res);
  //     this.cd_token = res.app_state.sess.cd_token;
  //     // { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' }
  //     this.currentUser = res.data;
  //     // this.currentUser.name = 'Login/Register';
  //     this.currentProfile.name = res.data.userData.username;
  //     this.cuid = res.data.userData.user_id;
  //     this.pals = res.data.pals;
  //     // this.currentUser.picture = 'assets/cd/branding/coop/avatarCircle.svg';
  //     const avatarUrl = `${this.env.HOST}/user-resources/${res.data.userData.user_guid}/avatar-01/a.jpg`;
  //     console.log('avatarUrl:', avatarUrl);
  //     this.currentProfile.picture = avatarUrl;
  //   }

  // }

  userDataResp(resp: ICdResponse) {
    console.log('starting UserService::init()');
    if (resp) {
      console.log('UserService::init()/res:', resp);
      // this.cd_token = resp.app_state.sess.cd_token;
      this.cd_token = resp.app_state.sess!.cd_token;
      // { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' }
      this.currentUser = resp.data;
      // this.currentUser.name = 'Login/Register';
      this.currentProfile.name = resp.data.userData.username;
      this.cuid = resp.data.userData.user_id;
      this.pals = resp.data.pals;
      // this.currentUser.picture = 'assets/cd/branding/coop/avatarCircle.svg';
      const avatarUrl = `${this.env.shellHost}/user-resources/${resp.data.userData.user_guid}/avatar-01/a.jpg`;
      console.log('avatarUrl:', avatarUrl);
      this.currentProfile.picture = avatarUrl;
    }

  }

  // authObsv(authData: AuthData) {
  //   console.log('authObsv(authData: AuthData)');
  //   this.setEnvelopeAuth(authData);
  //   /*
  //   post login request to server
  //   */
  //   console.log('Submit()/this.postData:', JSON.stringify(this.postData))
  //   return this.svServer.proc(this.postData);
  // }

  auth$(authData: IAuthData) {
    console.log('auth$(authData: AuthData)');
    delete authData.rememberMe;
    this.setEnvelopeAuth(authData);
    // console.log('Submit()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeAuth(authData: IAuthData) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'User',
      a: 'Login',
      dat: {
        f_vals: [
            {
                data: authData
            }
        ],
        token: null
    },
      args: null
    };
  }


  // getUserData(loginResp: CdResponse) {
  //   // console.log('starting UserService::getUserData()');
  //   // console.log('UserService::getUserData()/loginResp:', loginResp);
  //   this.setUserData(loginResp);
  // }

  setUserData(loginResp: any) {
    // console.log('starting UserService::setUserData(loginResp)');
    // console.log('UserService::setUserData(res)/loginResp:', loginResp);
    this.setEnvelopUserDataPost(loginResp);
    // console.log('UserService::setUserData(res)/this.postData:', JSON.stringify(this.postData));
    this.svServer.proc(this.postData).subscribe((userDataResp: any) => {
      // console.log('UserService::setUserData(res)/userDataResp:', userDataResp);
      // this.svMenu.init(userDataResp);
      this.userDataResp(userDataResp);
      // this.svNotif.init(userDataResp);
      this.svAppState.setMode('anon');
      // this.svMessages.init(userDataResp);
      this.env.consumer = userDataResp['data']['consumer'];
      // const cdEnvelop = { req: this.postData, resp: loginResp };

      /**
       * emittEvent is null because the purpose here is to
       * register user socket on successfull login.
       * At the time of this note, no broadcast event is set
       */
      const pushEnvelop: CdPushEnvelop = {
        pushRecepients: null,
        pushData: null,
        emittEvent: null,
        triggerEvent: 'login',
        req: null,
        resp: userDataResp
      };
      this.emitLogin(pushEnvelop);
    });
  }

  setEnvelopUserDataPost(loginResp: ICdResponse) {
    // console.log('starting UserService::setUserDataPost()');
    // console.log('setEnvelopUserDataPost/loginResp:', loginResp.app_state)
    /*
    set post data
    */
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'GetModuleUserData',
      dat: {
        fields: null,
        token: loginResp.app_state.sess!.cd_token
      },
      args: null
    }
  }

  

  getUsersObsv(f: CdFilter[] | null) {
    // console.log('starting getUsersObsv()');
    this.setEnvelopeUsers(f);
    // console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUsers(f: CdFilter[] | null) {
    let flt;
    if (f) {
      flt = [
        {
          filter: f
        }
      ]
    } else {
      flt = null;
    }
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'UserController',
      a: 'actionGet',
      dat: {
        f_vals: flt,
        token: this.cd_token
      },
      args: null
    };
  }

  registerUser(data: any) {
    console.log(data);
    console.log(data.is_sys_module);
    this.setEnvelopeRegUser(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegUser(res.data);
      });
  }

  /**
   * 
   * @param data 
   * {
          "ctx": "Sys",
          "m": "Moduleman",
          "c": "ModulesController",
          "a": "actionRegisterModule",
          "dat": {
              "f_vals": [
                  {
                      "data": {
                          "module_name": "FooModule",
                          "is_sys_module": false,
                          "module_type_id": 1
                      }
                  }
              ],
              "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
          },
          "args": null
      }
   */
  setEnvelopeRegUser(regData: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionRegisterModule',
      dat: {
        f_vals: [
          {
            data: regData
          }
        ],
        docproc: {},
        token: this.svServer.token
      },
      args: null
    };
  }

  setRespRegUser(data: any) {
    console.log(data);
  }

  getAllUsers() {
    this.setEnvelopeAllUsers();
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log('UserService::getAllUsers()/subscribe/res>>');
        console.log(res);
        this.setRespAllUsers(res);
      });
  }

  /**
   * {
            "ctx": "Sys",
            "m": "User",
            "c": "UserController",
            "a": "actionJoinGroup",
            "dat": {
                "f_vals": [
                    {
                        "data": {
                            "user_id": 1010,
                            "group_guid_parent": "25E5D480-1F1E-166B-F1CD-0BA2BD86DC22"
                        }
                    }
                ],
                "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
            },
            "args": null
        }
   */
  setEnvelopeAllUsers() {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'UserController',
      a: 'actionGetAll',
      dat: {
        f_vals: [],
        docproc: {},
        token: this.svServer.token
      },
      args: null
    };
  }

  setRespAllUsers(res: any) {
    console.log(res);
    this.allUsers = res['data'];
  }

  emitLogin(cdEnvelop: any) {
    this.svSocket.emit('login', cdEnvelop);
  }

  /**
   * The above is to effect switching to default image when user has not
   * set avatar.
   * Desired method is to use a directive.
   * Attempted sample: <project-dir>/src/app/pages/cd-palette/directives/default-image.directive.ts
   */
  getAvatar(User: any) {
    let src;
    if (User.done_avatar) {
      src = `${this.env.USER_RESOURCES}/${User.user_guid}/avatar-01/a.jpg`;
    } else {
      src = `${this.env.USER_RESOURCES}/ooooooooo/avatar-01/a.jpg`;
    }
    return src;
  }

  /**
   * get users registered under a given consumer
   * For demo purpose, we are just pulling all the users
   * However, yet to be implemented is registration of
   * <consumer_guig>-users where all the registered users will be kept.
   */
  getConsumerUsersObsv() {
    return this.getUsersObsv(null);
  }

  getGroupUsersObsv(groupGuidParent: any) {
    this.setEnvelopeGetGroupUsers(groupGuidParent);
    return this.svServer.proc(this.postData);
  }
  /**
   * {
          "ctx": "Sys",
          "m": "User",
          "c": "GroupMemberController",
          "a": "actionGetGroupUsers",
          "dat": {
              "f_vals": [
                  {
                      "data": {
                          "group_guid_parent": "08E30801-A7C0-E6A0-3FB1-394E7A71B456"
                      }
                  }
              ],
              "token": "15910E2B-5491-679D-3028-C99CE64CAC53"
          },
          "args": null
      }
   */
  setEnvelopeGetGroupUsers(groupGuidParent: any) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionGetGroupUsers',
      dat: {
        f_vals: [
          {
            data: {
              group_guid_parent: groupGuidParent
            }
          }
        ],
        docproc: {},
        token: this.svServer.token
      },
      args: null
    };
  }

  // setEnvelopeUsers() {
  //   this.postData = {
  //     ctx: 'Sys',
  //     m: 'User',
  //     c: 'UserController',
  //     a: 'actionGetAll',
  //     dat: {
  //       f_vals: [],
  //       docproc: {},
  //       token: this.svServer.token
  //     },
  //     args: null
  //   };
  // }

  list() {

  }

  joinGroup(user: any) {

  }

  getUserGroups() {

  }

}
