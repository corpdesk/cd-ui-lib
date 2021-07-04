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
