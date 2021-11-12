import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannigFormComponent } from './pages/plannig-form/plannig-form.component';

const routes: Routes = [
  { path: '',
    component: PlannigFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
