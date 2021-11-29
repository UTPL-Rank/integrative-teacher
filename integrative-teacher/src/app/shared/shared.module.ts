import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IconsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
