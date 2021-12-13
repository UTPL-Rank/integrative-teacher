import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
//import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsModule,
    //NgxDocViewerModule
    RouterModule
  ],
  exports: [
    IconsModule,
    //NgxDocViewerModule
  ]
})
export class SharedModule { }
