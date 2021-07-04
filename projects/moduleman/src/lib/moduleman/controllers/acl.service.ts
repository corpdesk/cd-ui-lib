import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AclService {
  // user privilage to change theme
  aclChangeTheme = false;
  constructor() { }
}
