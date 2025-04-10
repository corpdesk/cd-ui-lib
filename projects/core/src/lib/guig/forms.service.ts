import { Injectable } from '@angular/core';
import { ControlFor, FieldFor, FieldInfo, ControlType, AWizardModel } from './guig.model';
import { AWizardStep, ValidationError } from './guig.model';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BaseModel, EmittedDdlSelection, MultipleChoice, OptionItem } from './guig.model';
import { Observable } from 'rxjs';
import { ICdResponse, DEFAULT_CD_RESPONSE } from '../base';
import { CdPushEnvelop } from '../cd-push';
import { NotificationService } from '../comm';

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
    // console.log("FormsService::setInput()")
    this.fFields.forEach(field => {
      if (field.type == 'input') {
        field.fieldValue = this.getInpuVal(field.name);
      }

    });
  }

  debounceInput$(elemInput: HTMLInputElement) {
    // console.log("FormsService::debounceInput$()")
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
    // console.log("FormsService::getInpuVal()")
    const elem = document.getElementById(inputID) as HTMLInputElement;
    return elem.value;
  }

  validateForm() {
    console.log("FormsService::validateForm/01")
    this.vOutput = [];
    this.fFields.forEach(field => {
      // console.log("FormsService::validateForm/field.name:", field.name)
      this.validateField(field);
    });
  }

  validateField(field: any) {
    // console.log("FormsService::validateField/field.name:", field.name)
    for (const rule of Object.keys(field.rules)) {
      const ret = this.runRules(field, rule);
      this.vOutput.push({ fName: field.fieldName, valid: ret.valid, errMsg: ret.errMsg });
    }
  }

  runRules(field: any, rule: any): FvOutput {
    console.log("FormsService::runRules()")
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
    // console.log("FormsService::minChars()")
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
    // console.log("FormsService::maxChars()")
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
    // console.log('starting mustChars()');
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
    // console.log("FormsService::minSelItems()")
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
    // console.log("FormsService::useSelect()")
    return this.createFormControl(controls) === ControlType.select;
  }

  useSearchDropDown(controls: ControlFor[], controlName = null) {
    console.log("FormsService::useSearchDropDown()")
    console.log("FormsService::useSearchDropDown()/controls:", controls)
    return this.createFormControl(controls) === ControlType.searchDropDown;
  }
//   useSearchDropDown(controls: ControlFor[], controlName: string | null = null) {
//     console.log("FormsService::useSearchDropDown()");
//     console.log("FormsService::useSearchDropDown()/controls:", controls);
    
//     // Pass controlName to createFormControl for specific control targeting
//     return this.createFormControl(controls, controlName) === ControlType.searchDropDown;
// }

  useSelectMultiple(controls: ControlFor[]) {
    // console.log("FormsService::useSelectMultiple()")
    return this.createFormControl(controls) === ControlType.selectMultiple;
  }

  useTextArea(controls: ControlFor[]) {
    // console.log("FormsService::useTextArea()")
    return this.createFormControl(controls) === ControlType.textArea;
  }

  useText(controls: ControlFor[]) {
    // console.log("FormsService::useText()")
    return this.createFormControl(controls) === ControlType.text;
  }

  useUpload(controls: ControlFor[]) {
    // console.log("FormsService::useUpload()")
    return this.createFormControl(controls) === ControlType.upload;
  }

  useToggleSwitch(controls: ControlFor[]) {
    // console.log("FormsService::useToggleSwitch()")
    return this.createFormControl(controls) === ControlType.toggleSwitch;
  }

  useNgToggle(controls: ControlFor[]) {
    // console.log("FormsService::useNgToggle()")
    return this.createFormControl(controls) === ControlType.ngToggle;
  }

  useDualSwitch(controls: ControlFor[]) {
    // console.log("FormsService::useDualSwitch()")
    return this.createFormControl(controls) === ControlType.dualSwitch;
  }

  useDualRadio(controls: ControlFor[]) {
    // console.log("FormsService::useDualRadio()")
    return this.createFormControl(controls) === ControlType.dualRaido;
  }

  useAction(controls: ControlFor[]) {
    return this.createFormControl(controls) === ControlType.action;
  }

  useDdlCountries(controls: ControlFor[]) {
    // console.log("FormsService::useDdlCountries()")
    return this.createFormControl(controls) === ControlType.ddlCountries;
  }

  useDdlIcons(controls: ControlFor[]) {
    // console.log("FormsService::useDdlIcons()")
    return this.createFormControl(controls) === ControlType.ddlIcons;
  }

  useDdlNotifications(controls: ControlFor[]) {
    // console.log("FormsService::useDdlNotifications()")
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
    // console.log("FormsService::getFormValidationErrors()")
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
    // console.log("FormsService::filterByFieldFor()")
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
    return model.filter((f => f[attr])).map(f => f['name'])
  }



  createFormControl(controls: ControlFor[]): ControlType {
    console.log("FormsService::createFormControl()")
    console.log("FormsService::createFormControl()/controls:", controls)
    return controls.filter(c => c.fieldFor === FieldFor.createForm)
      .map(c => c.controlType)[0];
  }

//   createFormControl(controls: ControlFor[], controlName: string | null = null): ControlType | undefined {
//     console.log("FormsService::createFormControl() - Start");
//     console.log("FormsService::createFormControl() - Input controls:", controls);

//     // Step 1: Filter controls for items with matching fieldFor and controlName
//     const createFormControls = controls.filter((control) => {
//         const matchesField = control.fieldFor === FieldFor.createForm;
//         const matchesControlName = !controlName || control.name === controlName;
//         const nunNullName = controlName !== "null";
//         console.log(`FormsService::createFormControl() - Checking control:`, control);
//         console.log(`FormsService::createFormControl() - Matches FieldFor.createForm: ${matchesField}`);
//         console.log(`FormsService::createFormControl() - Matches controlName "${controlName}": ${matchesControlName}`);
//         return matchesField && matchesControlName && nunNullName;
//     });

//     // Step 2: Map to controlType and get the first controlType found (if any)
//     const controlTypes = createFormControls.map((control) => control.controlType);
//     const firstControlType = controlTypes[0];
//     console.log("FormsService::createFormControl() - First controlType found:", firstControlType);

//     console.log("FormsService::createFormControl() - End");
//     return firstControlType;
// }




  filterControlsByFieldFor(controls: ControlFor[], ff: FieldFor): ControlType {
    // console.log("FormsService::filterControlsByFieldFor()")
    return controls.filter(c => c.fieldFor === ff)
      .map(c => c.controlType)[0];
  }

  filterStepsByController(wizardModel: AWizardModel, controllerName: string): AWizardStep[] {
    // console.log("FormsService::filterStepsByController()")
    return wizardModel.steps!.filter(s => s.controller === controllerName)
  }

  /**
   * Extract formControlConfiguration from fields data
   * @param model 
   * @returns 
   */
  getFormControlConfig(model: FieldInfo[]): { [key: string]: any } {
    // console.log("FormsService::getFormControlConfig()")
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

  setDdlData(ddlId: string, data: any, model: FieldInfo[]) {
    // console.log("FormsService::setDdlData()")
    model.forEach((f) => {
      if (f.name === ddlId) {
        f.ddlInfo!.data = data;
      }
    })
  }

  getDdlData(ddlId: string, model: FieldInfo[]): any[] {
    // console.log('cd-ui-lib/FormService::getDdlData()/ddlId:', ddlId)
    // console.log('cd-ui-lib/FormService::getDdlData()/model:', model)
    return model
      .filter((f: FieldInfo) => {
        if (f.name === ddlId) {
          return f;
        } else {
          return null;
        }
      })
      .map((f) => f.ddlInfo!.data)[0];
  }

  setSelectedIcon(emittedDdlSelection: EmittedDdlSelection, baseModel: BaseModel, step: AWizardStep) {
    // console.log("FormsService::setSelectedIcon()")
    const selectedIcon = emittedDdlSelection.step!.fields.filter((f => f.controls
      .filter(cf => cf.controlType === ControlType.ddlIcons)))
      .filter(f => f.name === emittedDdlSelection.controlName)
      .map((control: FieldInfo) => {
        const val = control.ddlInfo?.selectedValue
        const fieldName = control.name;
        return {
          fieldName: control.name,
          selectedValue: val
        }
      })
    const iconStep = baseModel.data.wizardModel.steps.filter(s => s.controller === emittedDdlSelection.step!.controller)
      .map((s: AWizardStep) => {
        step.formGroup!.controls[selectedIcon[0].fieldName].setValue(selectedIcon[0].selectedValue)
        return s;
      })
  }

  deselectGroupControls(changedElem: HTMLInputElement, multipleChoice: MultipleChoice, baseModel: BaseModel) {
    multipleChoice.options.forEach((opt, i) => {
      if (this.isNotSelectedItem(opt, changedElem.id)) {
        this.setReverseValue(changedElem.checked, opt, i, multipleChoice, baseModel);
      }
    })
  }

  isNotSelectedItem(options: OptionItem, elemId: string): boolean {
    return elemId !== options.optControlId;
  }

  setReverseValue(changedElemState: boolean, opt: OptionItem, i: number, multipleChoice: MultipleChoice, baseModel: BaseModel) {
    baseModel.data.form.controls[multipleChoice.options[i].optControlId].setValue(!changedElemState)
    multipleChoice.options[i].selected = !changedElemState;
  }

  saveForm(step: AWizardStep, newObj: any, createObservable: Observable<any>, pushEnvelop: CdPushEnvelop, svNotif: NotificationService) {
    console.log("cdUiLib/FormsService::saveForm()/01")
    const fg: FormGroup = step.formGroup!;
    // to hold data to send to db
    const fArr = [];
    const invalids: any = [];
    console.log("cdUiLib/FormsService::saveForm()/fg.valid:", fg.valid)
    // if form is valid
    if (fg.valid) {
      // loop through the form controls
      for (let k of Object.keys(fg.controls)) {
        let fieldValue = fg.controls[k].value;
        const obj = { key: k, value: fieldValue };
        // take only values for savables
        if (this.isSavableField(k, step.fields)) {
          newObj.data[k] = fieldValue;
        }
        console.log(`fg.controls['${k}'].status`, fg.controls[k].status)
        // if a control is not valid, save on invalids
        if (!fg.controls[k].valid) {
          invalids.push(k);
        }
        fArr.push(obj);
      }
      // submit data to back end
      // service[serviceFn](newObj, token)
      createObservable
        .subscribe((r: any) => {
          const response: ICdResponse = r;
          console.log('resp:', response);
          // send notification
          pushEnvelop.pushData = response;
          console.log('guig/FormsService::saveForm()/response:', response)
          pushEnvelop.resp = response;
          console.log('guig/FormsService::saveForm()/pushEnvelop.pushRecepients:', pushEnvelop.pushRecepients)
          svNotif.emitNotif(pushEnvelop);
        })
    } else {
      // if form is not valid:
      for (let k of Object.keys(fg.controls)) {
        let fieldValue = fg.controls[k].value;
        const obj = { key: k, value: fieldValue };
        if (this.isSavableField(k, step.fields)) {
          newObj.data[k] = fieldValue;
        }
        console.log(`fg.controls['${k}'].status`, fg.controls[k].status)
        if (!fg.controls[k].valid) {
          invalids.push(k);
        }
        fArr.push(obj);
      }
      console.log('...correct invalid fields');
      console.log('invalid fields:', invalids)

      /////////////////////////

      const errMsg = `validation error on:${JSON.stringify(invalids)}`;
      let response: ICdResponse = DEFAULT_CD_RESPONSE;
      response.app_state.success = false;
      response.app_state.info!.messages.push(errMsg);
      response.app_state.info!.app_msg = errMsg;
      response.app_state.info!.code = 'FormService::saveForm';
      response.app_state.sess!.cd_token = step.token;
      console.log('resp:', response);
      // send notification
      pushEnvelop.pushData = response;
      pushEnvelop.resp = response;
      console.log('guig/FormsService::saveForm()/pushEnvelop.pushRecepients:', pushEnvelop.pushRecepients)
      svNotif.emitNotif(pushEnvelop);
    }
  }

  isSavableField(fieldName: any, model: FieldInfo[]): boolean {
    let ret: boolean = false;
    return model.filter(f => f.name === fieldName && f.savable).length > 0;
  }

}
