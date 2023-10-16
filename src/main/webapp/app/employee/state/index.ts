import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { EmployeeState } from './employee.reducer';

// Extends the app state to include the employee feature.
// This is required because employees are lazy loaded.
// So the reference to EmployeeState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  employees: EmployeeState;
}

// Selector functions
const getEmployeeFeatureState = createFeatureSelector<EmployeeState>('employees');

export const getShowEmployeeCode = createSelector(getEmployeeFeatureState, state => state.showEmployeeCode);

export const getCurrentEmployeeId = createSelector(getEmployeeFeatureState, state => state.currentEmployeeId);

export const getCurrentEmployee = createSelector(getEmployeeFeatureState, getCurrentEmployeeId, (state, currentEmployeeId) => {
  if (currentEmployeeId === 0) {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      employeeCode: 'New',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      fileName: '',
      starRating: 0,
    };
  } else {
    return currentEmployeeId ? state.employees.find(p => p.id === currentEmployeeId) : null;
  }
});

export const getEmployees = createSelector(getEmployeeFeatureState, state => state.employees);

export const getFiles = createSelector(getEmployeeFeatureState, state => state.files);

export const getError = createSelector(getEmployeeFeatureState, state => state.error);
