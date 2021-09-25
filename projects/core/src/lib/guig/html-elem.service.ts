import { Injectable } from '@angular/core';

import { HtmlCtx } from './models/html.model';

@Injectable({
  providedIn: 'root'
})
export class HtmlElemService {

  constructor() { }

  getByClass(cls: any) {
    if (cls) {
      return document.getElementsByClassName(cls);
    } else {
      return null;
    }
  }
  // mat element is checked
  isChecked(control: HTMLInputElement): any {
    if (this.isMat(control)) {
      if (control.classList.contains('mat-checkbox-checked')) {
        console.log('isChecked:', 'true');
        return true;
      } else {
        console.log('isChecked:', 'false');
        return false;
      }
    } else {
      console.log('cannot determine checkbox type')
    }
  }

  getElem(selector: any) {
    if (selector) {
      return document.getElementById(selector.id) as HTMLInputElement;
    } else {
      return null;
    }
  }

  addClassByID(id: any, cls: any) {
    const elem = document.getElementById(id) as HTMLElement;
    if (elem) {
      elem.classList.add(cls);
    }
  }

  removeClassByID(id: any, cls: any) {
    const elem = document.getElementById(id) as HTMLElement;
    if (elem) {
      elem.classList.remove(cls);
    }
  }

  isMat(control: HTMLInputElement) {
    const tagName = control.tagName
    const strTyp = tagName.substring(0, 4).toLowerCase();
    console.log('matType:', strTyp);
    if (strTyp === 'mat-') {
      return true;
    } else {
      return false;
    }
  }

  getHTMLContent(elem: any) {
    if (elem) {
      return elem.innerHTML;
    } else {
      return null;
    }
  }

  getHTMLInputVal(id: any) {
    const elem = document.getElementById(id) as HTMLInputElement;
    if (elem) {
      return elem.value;
    } else {
      return null;
    }
  }

  setHTMLInputVal(id: any, val: any) {
    const elem = document.getElementById(id) as HTMLInputElement;
    if (elem) {
      elem.value = val;
    }
  }

  /**
   * To depricate...use append(htmlCtx)
   * 'beforebegin': Before the element itself.
     'afterbegin': Just inside the element, before its first child.
     'beforeend': Just inside the element, after its last child.
     'afterend': After the element itself
   * @param elementRef 
   * @param selector 
   * @param srtHtml 
   */
  appendHtml(elementRef: any, selector: any, srtHtml: any) {
    const parent = elementRef.nativeElement.querySelector(selector) as HTMLElement;
    if (parent) {
      parent.insertAdjacentHTML('afterbegin', srtHtml);
    }
  }

  async append(htmlCtx: HtmlCtx): Promise<boolean> {
    const parent = htmlCtx.elementRef.nativeElement.querySelector(htmlCtx.selector) as HTMLElement;
    if (parent) {
      parent.insertAdjacentHTML(htmlCtx.position, htmlCtx.srtHtml);
      return true;
    } else {
      return false;
    }
  }
}
