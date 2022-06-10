import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GanttComponent } from './gantt/gantt.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [{
  path: 'pms',
  component: ProjectListComponent,
  children: [
    {
      path: '',
      component: ProjectListComponent,
    },
    {
      path: 'gantt',
      component: GanttComponent,
    },
    {
      path: 'project-list',
      component: ProjectListComponent,
    },
    {
      path: 'project',
      component: ProjectComponent,
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsRoutingModule { }
