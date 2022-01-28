import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningFormComponent } from './pages/plannig-form/planning-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PlanningFormComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanningModule { }
