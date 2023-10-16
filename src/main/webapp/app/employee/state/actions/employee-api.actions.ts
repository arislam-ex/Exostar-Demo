import { EmployeeFile } from 'app/employee/employee.file';
import { Employee } from '../../employee';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadEmployeesSuccess = createAction('[Employee API] Load Success', props<{ employees: Employee[] }>());

export const loadEmployeesFailure = createAction('[Employee API] Load Fail', props<{ error: string }>());

export const updateEmployeeSuccess = createAction('[Employee API] Update Employee Success', props<{ employee: Employee }>());

export const updateEmployeeFailure = createAction('[Employee API] Update Employee Fail', props<{ error: string }>());

export const uploadEmployeeListSuccess = createAction('[Employee API] Upload Employee List Success', props<{ employees: Employee[] }>());

export const uploadEmployeeListFailure = createAction('[Employee API] Upload Employee List Fail', props<{ error: string }>());

export const updateFileListSuccess = createAction('[Employee API] Update File List Success', props<{ files: any[] }>());

export const updateFileListFailure = createAction('[Employee API] Update File List Fail', props<{ error: string }>());

export const deleteFileSuccess = createAction('[Employee API] Delete File Success', props<{ file: File }>());

export const deleteFileFailure = createAction('[Employee API] Delete File Fail', props<{ error: string }>());

export const createEmployeeSuccess = createAction('[Employee API] Create Employee Success', props<{ employee: Employee }>());

export const createEmployeeFailure = createAction('[Employee API] Create Employee Fail', props<{ error: string }>());

export const deleteEmployeeSuccess = createAction('[Employee API] Delete Employee Success', props<{ employeeId: number }>());

export const deleteEmployeeFailure = createAction('[Employee API] Delete Employee Fail', props<{ error: string }>());
