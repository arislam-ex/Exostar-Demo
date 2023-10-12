import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'file-upload',
        loadChildren: () => import('./file-upload/file-upload.module').then(m => m.FileUploadModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
    RouterModule.forChild([
      {
        path: 'employee-details',
        loadChildren: () => import('./employee-management/employee-management.module').then(m => m.EmployeeManagementModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
    RouterModule.forChild([
      {
        path: 'employee-upload',
        loadChildren: () => import('./employee.module').then(m => m.EmployeeModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class EmployeeRoutingModule {}
