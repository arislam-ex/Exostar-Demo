import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { FileUploadComponent } from '../file-upload/file-upload.component';
import { fileUploadRoute } from './employee-upload.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([fileUploadRoute])],
  declarations: [FileUploadComponent],
})
export class FileUploadModule {}
