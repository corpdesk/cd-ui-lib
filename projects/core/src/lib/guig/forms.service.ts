import { ElementRef, Injectable } from '@angular/core';
import { ControlType } from './guig.model';
import { FileDetector } from 'protractor';
import { AWizardStep, ValidationError } from './guig.model';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

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

  debounceInput$(elemInput: HTMLInputElement) {
    return fromEvent(elemInput, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        })
        // if character length greater then 2
        , filter(res => res.length > 2 || res.length === 0)
        // , filter(res => res.length > 2)
        // Time in milliseconds between key events
        , debounceTime(1000)
        // If previous query is diffent from current   
        , distinctUntilChanged()
        // subscription for response
      )
  }

  getInpuVal(inputID: string) {
    const elem = document.getElementById(inputID) as HTMLInputElement;
    return elem.value;
  }

  validateForm() {
    this.vOutput = [];
    this.fFields.forEach(field => {
      this.validateField(field);
    });
  }

  validateField(field: any) {
    for (const rule of Object.keys(field.rules)) {
      const ret = this.runRules(field, rule);
      this.vOutput.push({ fName: field.fieldName, valid: ret.valid, errMsg: ret.errMsg });
    }
  }

  runRules(field: any, rule: any): FvOutput {
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
        ret = this.mustChars(field);
        break;
      case 'minSelItems':
        ret = this.minSelItems(field, rule);
        break;
      default:
        break;
    }
    return ret;
  }

  minChars(field: any, rule: any) {
    const ruleValue = field.rules[rule];
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

  useSelect(controlType: ControlType) {
    return controlType === ControlType.select;
  }

  useSearchDropDown(controlType: ControlType) {
    return controlType === ControlType.searchDropDown;
  }

  useSelectMultiple(controlType: ControlType) {
    return controlType === ControlType.selectMultiple;
  }

  useTextArea(controlType: ControlType) {
    return controlType === ControlType.textArea;
  }

  useText(controlType: ControlType) {
    return controlType === ControlType.text;
  }

  useUpload(controlType: ControlType) {
    return controlType === ControlType.upload;
  }

  useToggleSwitch(controlType: ControlType) {
    return controlType === ControlType.toggleSwitch;
  }

  useNgToggle(controlType: ControlType) {
    return controlType === ControlType.ngToggle;
  }

  useDualSwitch(controlType: ControlType) {
    return controlType === ControlType.dualSwitch;
  }

  useDualRadio(controlType: ControlType) {
    return controlType === ControlType.dualRaido;
  }

  useAction(controlType: ControlType) {
    return controlType === ControlType.action;
  }

  useDdlCountries(controlType: ControlType) {
    return controlType === ControlType.ddlCountries;
  }

  useDdlIcons(controlType: ControlType) {
    return controlType === ControlType.ddlIcons;
  }

  useDdlNotifications(controlType: ControlType) {
    return controlType === ControlType.ddlNotifications;
  }

  ////////////////////////////////////
  // STEPPER METHODS
  canStepBack(index: number, step: AWizardStep) {
    return index > 0;
  }

  /**
   * 
   * @param index 
   * @param steps 
   * @param cb // optional callback that can be used to validate foward movement
   * @returns 
   */
  canStepFoward(index: number, steps: AWizardStep[], cb: any = null) {
    let ret = false;
    if (cb) {
      ret = cb();
    } else {
      ret = index < (steps.length - 1);
    }
    return ret;
  }

  isLastStep(index: number, steps: AWizardStep[]) {
    return index === (steps.length - 1);
  }

  getFormValidationErrors(form: FormGroup): ValidationError[] {
    const result: any = [];
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key)!.errors!;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });
    return result;
  }

}
