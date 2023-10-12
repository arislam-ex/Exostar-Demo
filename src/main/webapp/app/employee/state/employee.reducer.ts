import { Employee } from '../employee';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { EmployeeApiActions, EmployeePageActions } from './actions';

// State for this feature (Employee)
export interface EmployeeState {
  showEmployeeCode: boolean;
  currentEmployeeId: number | null;
  employees: Employee[];
  error: string;
}

const initialState: EmployeeState = {
  showEmployeeCode: true,
  currentEmployeeId: null,
  employees: [],
  error: '',
};

export const employeeReducer = createReducer<EmployeeState>(
  initialState,
  on(
    EmployeePageActions.toggleEmployeeCode,
    (state): EmployeeState => ({
      ...state,
      showEmployeeCode: !state.showEmployeeCode,
    })
  ),
  on(
    EmployeePageActions.setCurrentEmployee,
    (state, action): EmployeeState => ({
      ...state,
      currentEmployeeId: action.currentEmployeeId,
    })
  ),
  on(
    EmployeePageActions.clearCurrentEmployee,
    (state): EmployeeState => ({
      ...state,
      currentEmployeeId: null,
    })
  ),
  on(
    EmployeePageActions.initializeCurrentEmployee,
    (state): EmployeeState => ({
      ...state,
      currentEmployeeId: 0,
    })
  ),
  on(
    EmployeeApiActions.loadEmployeesSuccess,
    (state, action): EmployeeState => ({
      ...state,
      employees: action.employees,
      error: '',
    })
  ),
  on(
    EmployeeApiActions.loadEmployeesFailure,
    (state, action): EmployeeState => ({
      ...state,
      employees: [],
      error: action.error,
    })
  ),
  on(EmployeeApiActions.updateEmployeeSuccess, (state, action): EmployeeState => {
    const updatedEmployees = state.employees.map(item => (action.employee.id === item.id ? action.employee : item));
    return {
      ...state,
      employees: updatedEmployees,
      currentEmployeeId: action.employee.id,
      error: '',
    };
  }),
  on(
    EmployeeApiActions.uploadEmployeeListSuccess,
    (state, action): EmployeeState => ({
      ...state,
      employees: action.employees,
      currentEmployeeId: action.employees[0].id,
      error: '',
    })
  ),
  on(
    EmployeeApiActions.uploadEmployeeListFailure,
    (state, action): EmployeeState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    EmployeeApiActions.deleteFileSuccess,
    (state, action): EmployeeState => ({
      ...state,
      employees: state.employees.filter(employee => employee.fileName !== action.file.name),
      currentEmployeeId: null,
      error: '',
    })
  ),
  on(
    EmployeeApiActions.deleteFileFailure,
    (state, action): EmployeeState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    EmployeeApiActions.updateEmployeeFailure,
    (state, action): EmployeeState => ({
      ...state,
      error: action.error,
    })
  ),
  // After a create, the currentEmployee is the new employee.
  on(
    EmployeeApiActions.createEmployeeSuccess,
    (state, action): EmployeeState => ({
      ...state,
      employees: [...state.employees, action.employee],
      currentEmployeeId: action.employee.id,
      error: '',
    })
  ),
  on(
    EmployeeApiActions.createEmployeeFailure,
    (state, action): EmployeeState => ({
      ...state,
      error: action.error,
    })
  ),
  // After a delete, the currentEmployee is null.
  on(
    EmployeeApiActions.deleteEmployeeSuccess,
    (state, action): EmployeeState => ({
      ...state,
      employees: state.employees.filter(employee => employee.id !== action.employeeId),
      currentEmployeeId: null,
      error: '',
    })
  ),
  on(
    EmployeeApiActions.deleteEmployeeFailure,
    (state, action): EmployeeState => ({
      ...state,
      error: action.error,
    })
  )
);
