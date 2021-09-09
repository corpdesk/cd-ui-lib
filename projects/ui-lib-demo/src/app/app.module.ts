import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MatModule } from './material-module';

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
import { MatFormFieldModule } from '@angular/material/form-field';


// import { environment } from '../environments/environment';
// import { UserModule } from '@corpdesk/core/src/lib/user';
// import { CdPushModule } from '@corpdesk/core/src/lib/cd-push';


// import { FeatureCModule } from '@corpdesk/ui-lib/src/lib/feature-c';
import { FeatureCModule } from '@corpdesk/ui-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
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
    MatFormFieldModule,
    BrowserModule,
    FeatureCModule,
    // UserModule.forRoot(environment),
    // CdPushModule.forRoot(environment),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
