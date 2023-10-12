/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';

import { IEmployee } from './employee-management.model';
import { EmployeeManagementService } from './service/employee-management.service';
import { EmployeeManagementComponent } from './list/employee-management.component';
import { EmployeeManagementDetailComponent } from './detail/employee-management-detail.component';
import { EmployeeManagementUpdateComponent } from './update/employee-management-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeeManagementResolve implements Resolve<IEmployee | null> {
  constructor(private service: EmployeeManagementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployee | null> {
    const id = route.params['login'];
    if (id) {
      return this.service.find(id);
    }
    return of(null);
  }
}

export const employeeManagementRoute: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':login/view',
    component: EmployeeManagementDetailComponent,
    resolve: {
      employee: EmployeeManagementResolve,
    },
  },
  {
    path: 'new',
    component: EmployeeManagementUpdateComponent,
    resolve: {
      employee: EmployeeManagementResolve,
    },
  },
  {
    path: ':login/edit',
    component: EmployeeManagementUpdateComponent,
    resolve: {
      employee: EmployeeManagementResolve,
    },
  },
];
