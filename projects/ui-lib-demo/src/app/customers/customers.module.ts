import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { NazModule } from '@corpdesk/naz';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbNavModule, NgbDropdownModule, NgbTooltipModule,
    Ng2SearchPipeModule,
    CustomersRoutingModule,
    NazModule
  ],
  exports:[CustomersComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomersModule { }
