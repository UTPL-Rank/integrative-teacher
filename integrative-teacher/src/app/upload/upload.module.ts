import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReadFileComponent } from './components/read-file/read-file.component';
import { StringToCsvParserService } from '../core/services/string-to-csv-parser.service';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadTeachersComponent } from './pages/upload-teachers/upload-teachers.component';
import { UploadDegreesComponent } from './pages/upload-degrees/upload-degrees.component';

@NgModule({
  declarations: [
    ReadFileComponent,
    UploadRoutingModule.pages,
    UploadTeachersComponent,
    UploadDegreesComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    SharedModule
  ],
  providers: [
    StringToCsvParserService,
  ]
})
export class UploadModule { }

