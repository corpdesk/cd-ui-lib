import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { FeatureCModule } from '@corpdesk/ui-lib/src/lib/feature-c';
import { FeatureCModule } from '@corpdesk/ui-lib';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatureCModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
