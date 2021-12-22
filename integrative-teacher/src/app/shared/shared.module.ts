import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxDocViewerModule
  ],
  exports: [
    IconsModule,
    ReactiveFormsModule,
    NgxDocViewerModule
  ]
})
export class SharedModule { }
