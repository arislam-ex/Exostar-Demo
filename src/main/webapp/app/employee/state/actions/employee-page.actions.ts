import { Employee } from '../../employee';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleEmployeeCode = createAction('[Employee Page] Toggle Employee Code');

export const setCurrentEmployee = createAction('[Employee Page] Set Current Employee', props<{ currentEmployeeId: number }>());

export const clearCurrentEmployee = createAction('[Employee Page] Clear Current Employee');

export const initializeCurrentEmployee = createAction('[Employee Page] Initialize Current Employee');

export const loadEmployees = createAction('[Employee Page] Load');

export const updateEmployee = createAction('[Employee Page] Update Employee', props<{ employee: Employee }>());

export const uploadEmployeeList = createAction('[Employee Page] Upload Employee List', props<{ fileName: string }>());

export const updateFileList = createAction('[Employee Page] Update File List');

export const deleteFile = createAction('[Employee Page] Delete File', props<{ fileName: string }>());

export const createEmployee = createAction('[Employee Page] Create Employee', props<{ employee: Employee }>());

export const deleteEmployee = createAction('[Employee Page] Delete Employee', props<{ employeeId: number }>());
