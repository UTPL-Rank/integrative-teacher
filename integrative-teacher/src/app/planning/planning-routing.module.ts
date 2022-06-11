import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningFormComponent } from './pages/planning-form/planning-form.component';
import { PlanningComponent } from './pages/planning/planning.component';

const routes: Routes = [
  { path: ':integrativeTeacherId',
    component: PlanningComponent,
  },
  { path: ':integrativeTeacherId/:planningId',
    component: PlanningFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
