import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlannigFormComponent } from './pages/plannig-form/plannig-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PlannigFormComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    SharedModule
  ]
})
export class PlanningModule { }
