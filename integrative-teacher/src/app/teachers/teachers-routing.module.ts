import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { TeacherViewComponent } from './pages/teacher-view/teacher-view.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersListComponent
  },
  {
    path: ':integrativeTeacherId',
    component: TeacherViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
