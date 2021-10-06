import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagetitleComponent } from './pagetitle.component';
import { CardComponent } from './card.component';



@NgModule({
  declarations: [PagetitleComponent, CardComponent],
  imports: [
    CommonModule,
    NgbNavModule, NgbDropdownModule, NgbTooltipModule,
    Ng2SearchPipeModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [PagetitleComponent, CardComponent]
})
export class NazUiModule { }
