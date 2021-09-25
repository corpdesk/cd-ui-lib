import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagetitleComponent } from './pagetitle.component';



@NgModule({
  declarations: [PagetitleComponent],
  imports: [
    CommonModule,
    NgbNavModule, NgbDropdownModule, NgbTooltipModule,
    Ng2SearchPipeModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [PagetitleComponent]
})
export class UiModule { }
