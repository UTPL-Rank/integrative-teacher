import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDegreesComponent } from './pages/upload-degrees/upload-degrees.component';
import { UploadFacultiesComponent } from './pages/upload-faculties/upload-faculties.component';
import { UploadTeachersComponent } from './pages/upload-teachers/upload-teachers.component';
import { UploadComponent } from './upload.component';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    children: [
      { path: 'facultades', component: UploadFacultiesComponent },
      { path: 'docentes', component: UploadTeachersComponent},
      { path: 'carreras', component: UploadDegreesComponent},
      { path: '**', redirectTo: 'facultades', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {
  static pages = [UploadComponent, UploadFacultiesComponent, UploadDegreesComponent];
}
