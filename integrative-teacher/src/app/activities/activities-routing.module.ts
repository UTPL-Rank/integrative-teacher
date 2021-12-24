import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherActivitiesComponent } from './pages/teacher-activities/teacher-activities.component';
import { ActivityDetailComponent } from './pages/activity-detail/activity-detail.component';

const routes: Routes = [
  { path: ':teacherId',
    component: TeacherActivitiesComponent,
  },
  { path: ':teacherId/:activityId/:activityNumber',
    component: ActivityDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
