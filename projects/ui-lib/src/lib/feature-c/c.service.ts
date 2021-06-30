import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CService {
  constructor() {}
  cAdd(a:number, b:number): number{
    return a + b;
  }
}
