import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  userMenu = [
    { title: 'Login', link: '/pages/cd-auth/login' },
    { title: 'Register', link: '/pages/cd-auth/register' }
  ];
  currentMenuItem = {
    title: "",
    link: ""
  };
  menuContext = {};
  constructor(private rout: Router) { }

  nav(path: any) {
    this.rout.navigateByUrl(path);
  }

  /**
   * secure navigation...requires tocken
   * @param iClient 
   * @param location 
   */
  sNavigate(iClient: any, location: string): void {
    try {
      const params = {
        queryParams: { token: iClient.baseModel.sess.cd_token },
        skipLocationChange: true,
        replaceUrl: false
      };
      iClient.router.navigate([location], params);
    } catch (e) {
      const msg = 'cannot access tocken. Navigation aborted';
      this.nsNavigate(iClient, '/', msg)
      console.log(msg)
      console.log('Error:', e)
    }
  }

  nsNavigate(iClient: any, location: string, msg:string): void {
    const params = {
      queryParams: {message:msg},
      skipLocationChange: true,
      replaceUrl: false
    };
    iClient.router.navigate([location], params);
  }

  /**
   * deduce the module and controller from path
   */
  navModule() {
    const items = this.currentMenuItem.link.substring(1); // remove the preceeding '/'
    const itemArr = items.split('/');
    console.log(itemArr);
    this.menuContext = {
      m: itemArr[1],
      c: itemArr[2]
    }
  };
}
