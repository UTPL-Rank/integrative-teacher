import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';

import { SharedModule } from '../shared/shared.module';
import { TeacherActivityViewComponent } from './pages/teacher-activity-view/teacher-activity-view.component';


@NgModule({
  declarations: [
    TeachersListComponent,
    TeacherViewComponent,
    TeacherActivityViewComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule
  ]
})
export class TeachersModule { }
