import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SigCanvasComponent } from './components/sig-canvas/sig-canvas.component';


@NgModule({
  declarations: [
    SigCanvasComponent
  ],
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
    NgxDocViewerModule,
    SigCanvasComponent
  ]
})
export class SharedModule { }
