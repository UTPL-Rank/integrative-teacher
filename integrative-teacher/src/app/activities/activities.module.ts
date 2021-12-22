import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { TeacherActivitiesComponent } from './pages/teacher-activities/teacher-activities.component';
import { ActivityDetailComponent } from './pages/activity-detail/activity-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TeacherActivitiesComponent,
    ActivityDetailComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule,
  ]
})
export class ActivitiesModule { }
