import { Injectable } from '@angular/core';
import { AWizardStep, BaseModel, FieldInfo } from '../guig';
// import { companyDdlCtx, companyGetQuery } from '../base';
// import { ModulemanService } from '../moduleman.service';
import { BaseService } from '../base';
import { ModulemanService } from './moduleman.service';
import { companyDdlCtx, companyGetQuery } from './company.model';

@Injectable({
    providedIn: 'root'
})
export class ConsumerFrontService {
    constructor(
        private svBase: BaseService,
        private svModman: ModulemanService,
    ) {

    }

    async loadDdls(baseModel: BaseModel, consumerStep: AWizardStep) {
        // moduleDdlCtx.token = baseModel.token;
        // moduleDdlCtx.step = consumerStep;
        // moduleDdlCtx.controlName = 'consumerTypeGuid';
        // moduleDdlCtx.getFn$ = this.svModule.getModule$(moduleGetQuery, baseModel.token);
        // await this.svModman.setDdl$(await moduleDdlCtx)
        //     .subscribe((ret) => {
        //         // console.log('menu/ConsumerModService::loadDdls()/ret(modules):', ret)
        //         consumerStep.fields.forEach((f: FieldInfo) => {
        //             if (f.name === 'consumerTypeGuid') {
        //                 f.ddlInfo!.data = ret;
        //             }
        //         })
        //     })

        companyDdlCtx.token = baseModel.token;
        companyDdlCtx.step = consumerStep;
        companyDdlCtx.controlName = 'companyId';
        console.log('ConsumerModService::loadDdls()/companyGetQuery:', companyGetQuery)
        companyDdlCtx.getFn$ = this.svBase.getPaged$(companyGetQuery, baseModel.token,'Sys','Moduleman','Company');
        await this.svModman.setDdl$(await companyDdlCtx)
            .subscribe((ret) => {
                console.log('consumer/ConsumerModService::loadDdls()/ret(companies):', ret)
                consumerStep.fields.forEach((f: FieldInfo) => {
                    if (f.name === 'companyId') {
                        f.ddlInfo!.data = ret;
                    }
                })
            })
    }


}