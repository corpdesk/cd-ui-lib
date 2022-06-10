import { NgModule } from '@angular/core';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTreeModule } from '@angular/material/tree';
import { MatError } from '@angular/material/form-field';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatSlideToggleModule,
        MatBottomSheetModule,
        MatTreeModule,
        MatError,
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatSlideToggleModule,
        MatBottomSheetModule,
        MatTreeModule,
        MatError,
    ]
})
export class MatModule { }