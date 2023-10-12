import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { FileUploadComponent } from './file-upload.component';
import { fileUploadRoute } from './file-upload.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([fileUploadRoute])],
  declarations: [FileUploadComponent],
})
export class FileUploadModule {}
