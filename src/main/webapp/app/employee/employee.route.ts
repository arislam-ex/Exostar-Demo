import { Routes } from '@angular/router';
import { EmployeeShellComponent } from './employee-shell/employee-shell.component';

import { fileUploadRoute } from './file-upload/file-upload.route';

const EMPLOYEE_ROUTES = [fileUploadRoute];

export const employeeRoutes: Routes = [
  {
    path: 'file-upload',
    children: EMPLOYEE_ROUTES,
  },
  { path: '', component: EmployeeShellComponent },
];
