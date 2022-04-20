import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { ImportantDocumentsComponent } from './pages/important-documents/important-documents.component';
import { SharedModule } from '../shared/shared.module';
// import { NgxDocViewerModule } from 'ngx-doc-viewer';
@NgModule({
  declarations: [ImportantDocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule
    // NgxDocViewerModule
  ]
})
export class DocumentsModule { }
