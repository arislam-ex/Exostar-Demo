/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EmployeeService } from '../employee.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeePageActions, EmployeeApiActions } from './actions';
import { EmployeeUploadService } from '../employee-upload/employee-upload.service';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private employeeService: EmployeeService, private employeeUploadService: EmployeeUploadService) {}

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeePageActions.loadEmployees),
      mergeMap(() =>
        this.employeeService.getEmployees().pipe(
          map(employees => EmployeeApiActions.loadEmployeesSuccess({ employees })),
          catchError(error => of(EmployeeApiActions.loadEmployeesFailure({ error })))
        )
      )
    );
  });

  updateEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeePageActions.updateEmployee),
      concatMap(action =>
        this.employeeService.updateEmployee(action.employee).pipe(
          map(employee => EmployeeApiActions.updateEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeApiActions.updateEmployeeFailure({ error })))
        )
      )
    );
  });

  uploadEmployeeList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeePageActions.uploadEmployeeList),
      concatMap(action =>
        this.employeeService.uploadEmployeeList(action.fileName).pipe(
          map(employees => EmployeeApiActions.uploadEmployeeListSuccess({ employees })),
          catchError(error => of(EmployeeApiActions.uploadEmployeeListFailure({ error })))
        )
      )
    );
  });

  deleteFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeePageActions.deleteFile),
      concatMap(action =>
        this.employeeUploadService.deleteFile(action.fileName).pipe(
          map(file => EmployeeApiActions.deleteFileSuccess({ file })),
          catchError(error => of(EmployeeApiActions.deleteFileFailure({ error })))
        )
      )
    );
  });

  createEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeePageActions.createEmployee),
      concatMap(action =>
        this.employeeService.createEmployee(action.employee).pipe(
          map(employee => EmployeeApiActions.createEmployeeSuccess({ employee })),
          catchError(error => of(EmployeeApiActions.createEmployeeFailure({ error })))
        )
      )
    );
  });

  deleteEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeePageActions.deleteEmployee),
      mergeMap(action =>
        this.employeeService.deleteEmployee(action.employeeId).pipe(
          map(() => EmployeeApiActions.deleteEmployeeSuccess({ employeeId: action.employeeId })),
          catchError(error => of(EmployeeApiActions.deleteEmployeeFailure({ error })))
        )
      )
    );
  });
}
