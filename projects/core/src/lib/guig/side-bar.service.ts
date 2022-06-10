import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  isExpanded = false;
  constructor() { }

  /**
   * set sidebar state to allow
   * atuto shrinking when work 
   * area is clicked
   * @goremo
   * 09/2020
   * 
   * NB: 
   *  - <nb-sidebar> aquire class="menu-sidebar left expanded" when expanded
   */
  setSidebarState() {
    console.log('SideBarService::starting setSidebarState()');
    const el = document.querySelector('nb-sidebar.expanded') as HTMLElement;
    // el.className += ' active';
    if (el) {
      console.log(el.className); // 'list active'
      this.isExpanded = true;
      console.log('width:', el.offsetWidth);
    } else {
      console.log('class not found');
    }
  }
}
