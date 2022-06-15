import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';
import { TeacherActivityViewComponent } from './pages/teacher-activity-view/teacher-activity-view.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersListComponent
  },
  {
    path: ':integrativeTeacherId/:planningId',
    component: TeacherViewComponent
  },
  {
    path: ':integrativeTeacherId/:planningId/:activityId/:activityNumber',
    component: TeacherActivityViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
