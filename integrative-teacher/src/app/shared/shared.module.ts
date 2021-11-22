import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule
  ],
  exports: [
    IconsModule,
  ]
})
export class SharedModule { }
