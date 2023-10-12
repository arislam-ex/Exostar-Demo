import { Route } from '@angular/router';

import { FileUploadComponent } from './file-upload.component';

export const fileUploadRoute: Route = {
  path: '',
  component: FileUploadComponent,
  data: {
    pageTitle: 'File-upload',
  },
};
