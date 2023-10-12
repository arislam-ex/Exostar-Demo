import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeManagementComponent } from './list/employee-management.component';
import { EmployeeManagementDetailComponent } from './detail/employee-management-detail.component';
import { EmployeeManagementUpdateComponent } from './update/employee-management-update.component';
import { EmployeeManagementDeleteDialogComponent } from './delete/employee-management-delete-dialog.component';
import { employeeManagementRoute } from './employee-management.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(employeeManagementRoute)],
  declarations: [
    EmployeeManagementComponent,
    EmployeeManagementDetailComponent,
    EmployeeManagementUpdateComponent,
    EmployeeManagementDeleteDialogComponent,
  ],
})
export class EmployeeManagementModule {}
