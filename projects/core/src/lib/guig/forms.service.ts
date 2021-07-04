import { Injectable } from '@angular/core';
import { FileDetector } from 'protractor';

interface Rule {
  minChars?: number;
  maxChars?: number;
  mustChars?: Array<string>;
  isDate?: boolean;
  isNumerical?: boolean;
  isEmail?: boolean;
  isSecurePassword?: boolean;
  useRegEx?: string;
  minSelItems?: number; // applied to ddl
}

interface FormField {
  name: string;
  type: string;
  fieldValue: any; // input is string, ddl is array
  rules: Rule;
}

// field validation output
interface FvOutput {
  fName: string;
  valid: boolean;
  errMsg: string;
}



@Injectable({
  providedIn: 'root'
})
export class FormsService {
  fFields: FormField[] = []; // array of fields and rules
  vOutput: FvOutput[] = []; // array of field validation output
  isValid = true;
  constructor() {

  }

  init() {
    this.isValid = true;
    this.setInput();
    this.validateForm();
    this.reset();
    return this.isValid;
  }

  setInput() {
    this.fFields.forEach(field => {
      if (field.type == 'input') {
        field.fieldValue = this.getInpuVal(field.name);
      }

    });
  }

  getInpuVal(inputID: string) {
    console.log('starting getInpuVal()');
    console.log('inputID:', inputID);
    const elem = document.getElementById(inputID) as HTMLInputElement;
    return elem.value;
  }

  validateForm() {
    console.log('starting validateForm()');
    this.vOutput = [];
    this.fFields.forEach(field => {
      this.validateField(field);
    });
  }

  validateField(field: any) {
    console.log('starting validateField()');
    for (const rule of Object.keys(field.rules)) {
      const ret = this.runRules(field, rule);
      this.vOutput.push({ fName: field.fieldName, valid: ret.valid, errMsg: ret.errMsg });
    }
  }

  runRules(field: any, rule: any): FvOutput {
    console.log('starting runRules()');
    const ruleValue = field.rules[rule];
    let ret: any = {
      fName: field.fieldName,
      valid: true,
      errMsg: ''
    };
    switch (rule) {
      case 'minChars':
        ret = this.minChars(field, rule);
        break;
      case 'maxChars':
        ret = this.maxChars(field, rule);
        break;
      case 'mustChars':
        console.log('switch/rule>>');
        console.log(rule);
        console.log('switch/field>>');
        console.log(field);
        ret = this.mustChars(field);
        break;
      case 'minSelItems':
        console.log('switch/rule>>');
        console.log(rule);
        console.log('switch/field>>');
        console.log(field);
        ret = this.minSelItems(field, rule);
        break;
      default:
        break;
    }
    return ret;
  }

  minChars(field: any, rule: any) {
    console.log('starting minChars()');
    console.log('field>>');
    console.log(field);
    console.log('rule>>');
    console.log(rule);
    const ruleValue = field.rules[rule];
    console.log('ruleValue>>');
    console.log(ruleValue);
    let ret: any = {
      fName: field.name,
      valid: true,
      errMsg: ``
    };
    if (field.fieldValue.length < ruleValue) {
      this.isValid = false;
      ret = {
        fName: field.name,
        valid: false,
        errMsg: `${field.name} must be more than ${ruleValue} characters;\n`
      };
    }
    return ret;
  }

  maxChars(field: any, rule: any) {
    console.log('starting maxChars()');
    const ruleValue = field.rules[rule];
    let ret = {
      fName: field.name,
      valid: true,
      errMsg: ``
    };
    if (field.fieldValue.length > ruleValue) {
      this.isValid = false;
      ret = {
        fName: field.name,
        valid: false,
        errMsg: `${field.name} must be less than ${ruleValue} characters;\n`
      };
    }
    return ret;
  }

  mustChars(field: any) {
    console.log('starting mustChars()');
    // const ruleValue = field.rules[rule];
    let valididity;
    let msg = '';
    console.log('rule>>');
    // console.log(rule);
    field.rules.mustChars.forEach((c: any) => {
      const i = field.fieldValue.indexOf(field.fieldValue[c]);
      if (i < 1) {
        this.isValid = false;
        valididity = false;
        msg += `missing '${c}';\n`;
      }
    });
    const ret = {
      fName: field.fieldName,
      valid: valididity,
      errMsg: msg
    };
    return ret;
  }

  minSelItems(field: any, rule: any) {
    console.log('starting minSelItems()');
    const ruleValue = field.rules[rule];
    let ret = {
      fName: field.name,
      valid: true,
      errMsg: ``
    };
    if (field.fieldValue.length < ruleValue) {
      this.isValid = false;
      ret = {
        fName: field.name,
        valid: false,
        errMsg: `${field.name} selections must be more than ${ruleValue};\n`
      };
    }
    return ret;

  }

  getFrmErr() {
    console.log('starting getFrmErr()');
    let errMsg = '';
    this.vOutput.forEach(field => {
      if (field.valid === false) {
        errMsg += field.errMsg;
      }
    });
    return errMsg;
  }

  reset() {
    this.fFields = [];
  }

}
