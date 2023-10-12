import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';
import { employeeRoutes } from './employee.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeShellComponent } from './employee-shell/employee-shell.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { employeeReducer } from './state/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './state/employee.effects';

/* NgRx */
import { StoreModule } from '@ngrx/store';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(employeeRoutes),
    StoreModule.forFeature('employees', employeeReducer),
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  declarations: [EmployeeUploadComponent, EmployeeShellComponent, EmployeeListComponent, EmployeeEditComponent],
})
export class EmployeeModule {}
