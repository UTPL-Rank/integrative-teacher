import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
//import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsModule,
    //NgxDocViewerModule
  ],
  exports: [
    IconsModule,
    //NgxDocViewerModule
  ]
})
export class SharedModule { }
