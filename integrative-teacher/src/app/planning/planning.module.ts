import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlannigFormComponent } from './pages/plannig-form/plannig-form.component';


@NgModule({
  declarations: [PlannigFormComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule
  ]
})
export class PlanningModule { }
