import { Type } from '@angular/core';
export interface TabMeta{
  title: string;
  options: any;
}
export class TabItem {
  constructor(public component: Type<any>, public data: TabMeta) {}
}
