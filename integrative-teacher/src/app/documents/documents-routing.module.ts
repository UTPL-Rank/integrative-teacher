import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportantDocumentsComponent } from './pages/important-documents/important-documents.component';

const routes: Routes = [
  {
    path:'',
    component: ImportantDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
