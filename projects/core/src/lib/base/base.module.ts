import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './IBase';
import { ServerService } from './server.service';

// import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NavService } from './nav.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.OFF,
      serverLoggingUrl: '/api/logs',
      disableConsoleLogging: false, // Disable logging to the browser console
      enableSourceMaps: true, // Enable source maps to map errors back to original TypeScript code
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'] // Customize log colors
    }),
    HttpClientModule,
  ],
})
export class BaseModule {
  static forRoot(env: EnvConfig): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ServerService,
        { provide: 'env', useValue: env }
      ]
    };
  }

  static forChild(env: EnvConfig): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ServerService,
        { provide: 'env', useValue: env },
        NavService
      ]
    };
  }
}

export * from './IBase';
