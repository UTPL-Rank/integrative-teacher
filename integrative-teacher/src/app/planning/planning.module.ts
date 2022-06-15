import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningFormComponent } from './pages/planning-form/planning-form.component';
import { SharedModule } from '../shared/shared.module';
import { PlanningComponent } from './pages/planning/planning.component';


@NgModule({
  declarations: [PlanningFormComponent, PlanningComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanningModule { }
