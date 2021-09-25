import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { UserService, AuthData, SessService, NavService, MenuService } from '@corpdesk/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // @Input() breadcrumbItems: any;
  // @Input() title: string = '';
  title = 'Demo';
  // bread crumb items
  breadCrumbItems: Array<{}> = [];

  loginInvalid = false;
  rememberMe = true;
  submitted = false;
  fg: FormGroup;
  postData: any;
  errMsg: any;
  constructor(
    private svUser: UserService,
    private svSess: SessService,
    private svMenu: MenuService,
    private svNav: NavService,
    private route: Router,
  ) {
    this.fg = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl()
    });
  }

  // ngOnInit() {
  //   // this.breadCrumbItems = [{ label: 'comm' }, { label: 'memo-compose' + this.svC.cAdd(3, 4), active: true }];
  // }

  login(fg: any) {
    let authData: AuthData = fg.value;
    const valid = fg.valid;
    this.submitted = true;
    const consumerGuid = { consumer_guid: environment.consumerToken };
    authData = Object.assign({}, authData, consumerGuid); // merge data with consumer object
    console.log('login(fg)/authData:', authData);
    try {
      if (valid) {
        this.initSession(authData);
      }
    } catch (err) {
      this.errMsg = "Something went wrong!!"
      this.loginInvalid = true;
    }
  }

  initSession(authData: AuthData) {
    this.svUser.auth$(authData).subscribe((res: any) => {
      if (res.app_state.success === 1) {
        /*
        create a session on successfull authentication.
        For subsequeng successull request to the server,
        use renewSess(res);
        */
        if (res.app_state.sess.cd_token !== null) {
          this.svSess.createSess(res, this.svMenu);
          console.log('login_res:', res);
          this.svUser.currentUser = { name: `${res.data[0].username}`, picture: `${environment.HOST}/user-resources/${res.data[0].user_guid}/avatar-01/a.jpg` };
          this.svNav.userMenu = [
            { title: 'Profile', link: '/pages/cd-auth/register' },
            { title: 'Log out', link: '/pages/cd-auth/logout' }
          ];
          // this.route.navigate(['/pms']);
          const params = { queryParams: { token: res.app_state.sess.cd_token } };
          console.log('AppComponent::initSession(authData: AuthData)/params:', params);
          this.route.navigate(['/comm'], params);
        }


      } else {
        this.errMsg = "The username and password were not valid"
        this.loginInvalid = true;
        this.svSess.logout();
      }
    });

  }

  // onFocus() {
  //   this.errMsg = "";
  //   // this.loginInvalid = false;
  // }
}
