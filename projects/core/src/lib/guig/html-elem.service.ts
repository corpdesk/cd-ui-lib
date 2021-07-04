import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlElemService {

  constructor() { }

  getByClass(cls: any) {
    return document.getElementsByClassName(cls);
    // var result = "document.getElementsByClassName('orange juice')";
    // for (var i = 0, len = allOrangeJuiceByClass.length | 0; i < len; i = i + 1 | 0) {
    //   result += "\n  " + allOrangeJuiceByClass[i].textContent;
    // }
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
    return document.getElementById(selector.id) as HTMLInputElement;
  }

  addClassByID(id: any, cls: any) {
    const elem = document.getElementById(id) as HTMLElement;
    elem.classList.add(cls);
  }

  removeClassByID(id: any, cls: any) {
    const elem = document.getElementById(id) as HTMLElement;
    elem.classList.remove(cls);
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
    console.log(elem.innerHTML);
    return elem.innerHTML;
  }

  getHTMLInputVal(id: any) {
    const elem = document.getElementById(id) as HTMLInputElement;
    console.log(elem.value);
    return elem.value;
  }

  setHTMLInputVal(id: any, val: any) {
    const elem = document.getElementById(id) as HTMLInputElement;
    elem.value = val;
  }

  appendHtml(elementRef: any, selector: any, srtHtml: any) {
    const parent = elementRef.nativeElement.querySelector(selector) as HTMLElement;
    parent.insertAdjacentHTML('afterbegin', srtHtml);
  }

  

}
