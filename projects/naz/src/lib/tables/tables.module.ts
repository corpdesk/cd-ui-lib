import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TableAdvComponent } from './table-adv.component';



@NgModule({
  declarations: [TableAdvComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbNavModule, NgbDropdownModule, NgbTooltipModule,
    Ng2SearchPipeModule
  ],
  exports: [TableAdvComponent]
})
export class NazModule { }
