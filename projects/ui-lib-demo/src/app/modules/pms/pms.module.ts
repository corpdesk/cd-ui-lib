import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsRoutingModule } from './pms-routing.module';
import { GanttComponent } from './gantt/gantt.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    GanttComponent,
    ProjectListComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    PmsRoutingModule
  ]
})
export class PmsModule { }
