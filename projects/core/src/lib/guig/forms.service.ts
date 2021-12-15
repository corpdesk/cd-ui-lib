import { Injectable } from '@angular/core';
import { ControlFor, FieldFor, FieldInfo, ControlType, AWizardModel } from './guig.model';
import { AWizardStep, ValidationError } from './guig.model';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
// import { AWizardModel } from '@corpdesk/core';

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

  useSelect(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.select;
  }

  useSearchDropDown(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.searchDropDown;
  }

  useSelectMultiple(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.selectMultiple;
  }

  useTextArea(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.textArea;
  }

  useText(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.text;
  }

  useUpload(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.upload;
  }

  useToggleSwitch(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.toggleSwitch;
  }

  useNgToggle(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.ngToggle;
  }

  useDualSwitch(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.dualSwitch;
  }

  useDualRadio(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.dualRaido;
  }

  useAction(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.action;
  }

  useDdlCountries(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.ddlCountries;
  }

  useDdlIcons(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.ddlIcons;
  }

  useDdlNotifications(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.ddlNotifications;
  }

  // useSelect(controlType: ControlType) {
  //   return controlType === ControlType.select;
  // }

  // useSearchDropDown(controlType: ControlType) {
  //   return controlType === ControlType.searchDropDown;
  // }

  // useSelectMultiple(controlType: ControlType) {
  //   return controlType === ControlType.selectMultiple;
  // }

  // useTextArea(controlType: ControlType) {
  //   return controlType === ControlType.textArea;
  // }

  // useText(controlType: ControlType) {
  //   return controlType === ControlType.text;
  // }

  // useUpload(controlType: ControlType) {
  //   return controlType === ControlType.upload;
  // }

  // useToggleSwitch(controlType: ControlType) {
  //   return controlType === ControlType.toggleSwitch;
  // }

  // useNgToggle(controlType: ControlType) {
  //   return controlType === ControlType.ngToggle;
  // }

  // useDualSwitch(controlType: ControlType) {
  //   return controlType === ControlType.dualSwitch;
  // }

  // useDualRadio(controlType: ControlType) {
  //   return controlType === ControlType.dualRaido;
  // }

  // useAction(controlType: ControlType) {
  //   return controlType === ControlType.action;
  // }

  // useDdlCountries(controlType: ControlType) {
  //   return controlType === ControlType.ddlCountries;
  // }

  // useDdlIcons(controlType: ControlType) {
  //   return controlType === ControlType.ddlIcons;
  // }

  // useDdlNotifications(controlType: ControlType) {
  //   return controlType === ControlType.ddlNotifications;
  // }

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

  /**
   * filter fields: FieldInfo[] by FieldFor
   * @param model 
   * @param ff 
   * @returns 
   */
  filterByFieldFor(model: FieldInfo[], ff: FieldFor) {
    // console.log('starting FormService::filterByFieldFor()')
    // return model.filter(f => f.controls.every(c => c.fieldFor === ff));
    return model.filter(f => model.filter((f: FieldInfo) => {
      const isFF = this.isFieldFor(f, ff);
      console.log()
      if (isFF) {
        switch (ff) {
          case FieldFor.createForm:
            // console.log('ff = FieldFor.createForm')
            // console.log('FormService::isFieldFor/ff:', ff)
            // console.log('FormService::isFieldFor/f.name:', f.name)
            // console.log('FormService::isFieldFor/f.controls:', f.controls)
            break;
          case FieldFor.tableDisplay:
            // console.log('ff = FieldFor.tableDisplay')
            // console.log('FormService::isFieldFor/ff:', ff)
            // console.log('FormService::isFieldFor/f.name:', f.name)
            // console.log('FormService::isFieldFor/f.controls:', f.controls)
            break;
        }
        return f;
      } else {
        return false;
      }
    }))
    
  }

  isFieldFor(field: FieldInfo, ff: FieldFor) {
    // console.log('FormService::isFieldFor/field:', field)
    // console.log('FormService::isFieldFor/ff:', ff)
    // switch (ff) {
    //   case FieldFor.createForm:
    //     console.log('ff = FieldFor.createForm')
    //     console.log('FormService::isFieldFor/field.name:', field.name)
    //     console.log('FormService::isFieldFor/field.controls:', field.controls)
    //     break;
    //   case FieldFor.tableDisplay:
    //     console.log('ff = FieldFor.tableDisplay')
    //     console.log('FormService::isFieldFor/field.name:', field.name)
    //     console.log('FormService::isFieldFor/field.controls:', field.controls)
    //     break;
    // }
    const result = field.controls.filter(
      (c: any) => {
        if (c.fieldFor === ff) {
          // console.log('FormService::isFieldFor/field.name:', field.name)
          // console.log('FormService::isFieldFor/c.fieldFor:', c.fieldFor)
          // console.log('FormService::isFieldFor/ff:', ff)
          return c;
        }
      });
    // console.log('FormService::isFieldFor/result:', result)
    return result.length > 0;
  }

  filterByAttribute(model: { [key: string]: any }[], attr: string) {
    return model.filter((f => f[attr])).map(f => f.name)
  }

  // /**
  //  * extract fields required for create form
  //  * @param model 
  //  * @returns 
  //  */
  //   createFields(model: FieldInfo[]): FieldInfo[] {
  //     // return model.filter(f => f.controls.filter(cf => cf.fieldFor === FieldFor.createForm));
  //     return this.filterByFieldFor(model, FieldFor.createForm)
  //   }

  //   tableDisplayFields(model: FieldInfo[]): FieldInfo[] {
  //     // return model.filter(f => f.controls.filter(cf => cf.fieldFor === FieldFor.createForm));
  //     return this.filterByFieldFor(model, FieldFor.tableDisplay)
  //   }

  //   isTableDisplayField(field: FieldInfo){
  //     return field.controls.filter(c => c.fieldFor === FieldFor.tableDisplay).length > 0;
  //   }

  //   editFields(model: FieldInfo[]): FieldInfo[] {
  //     // return model.filter(f => f.controls.filter(cf => cf.fieldFor === FieldFor.createForm));
  //     return this.filterByFieldFor(model, FieldFor.editForm)
  //   }

  //   deleteFields(model: FieldInfo[]): FieldInfo[] {
  //     // return model.filter(f => f.controls.filter(cf => cf.fieldFor === FieldFor.createForm));
  //     return this.filterByFieldFor(model, FieldFor.deleteForm)
  //   }

  //   tableDisplayControl(controls: ControlFor[]) {
  //     return controls.filter(c => c.fieldFor === FieldFor.tableDisplay)
  //       .map(c => c.controlType)[0];
  //   }

  createFormControl(controls: ControlFor[]): ControlType {
    return controls.filter(c => c.fieldFor === FieldFor.createForm)
      .map(c => c.controlType)[0];
  }

  // editFormControl(controls: ControlFor[]): ControlType {
  //   return controls.filter(c => c.fieldFor === FieldFor.editForm)
  //     .map(c => c.controlType)[0];
  // }

  filterControlsByFieldFor(controls: ControlFor[], ff: FieldFor): ControlType {
    return controls.filter(c => c.fieldFor === ff)
      .map(c => c.controlType)[0];
  }

  filterStepsByController(wizardModel: AWizardModel, controllerName: string): AWizardStep[] {
    return wizardModel.steps!.filter(s => s.controller === controllerName)
  }

  /**
   * Extract formControlConfiguration from fields data
   * @param model 
   * @returns 
   */
  getFormControlConfig(model: FieldInfo[]): { [key: string]: any } {
    const formControlsConfig = model
      .filter(f => f.formControlsConfig)
      .map(f => { return { field: f.name, value: f.formControlsConfig }; });
    const modForm: { [key: string]: any } = {};
    formControlsConfig
      .forEach((config) => {
        modForm[config.field] = config.value;
      })
    return modForm;
  }

  //   deleteFormControl(controls: ControlFor[]): ControlType {
  //     return controls.filter(c => c.fieldFor === FieldFor.deleteForm)
  //       .map(c => c.controlType)[0];
  //   }

}
