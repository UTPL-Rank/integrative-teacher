import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningFormComponent } from './pages/plannig-form/planning-form.component';

const routes: Routes = [
  { path: ':integrativeTeacherId',
    component: PlanningFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
