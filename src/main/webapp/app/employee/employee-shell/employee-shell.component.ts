import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../employee';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getShowEmployeeCode, getCurrentEmployee, getEmployees, getError, getFiles } from '../state';

import { EmployeePageActions } from '../state/actions';
import { EmployeeFile } from '../employee.file';

@Component({
  templateUrl: './employee-shell.component.html',
})
export class EmployeeShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedEmployee$: Observable<Employee>;
  employees$: Observable<Employee[]>;
  files$: Observable<any[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.employees$ = this.store.select(getEmployees);

    this.files$ = this.store.select(getFiles);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(EmployeePageActions.loadEmployees());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedEmployee$ = this.store.select(getCurrentEmployee);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getShowEmployeeCode);
  }

  checkChanged(): void {
    this.store.dispatch(EmployeePageActions.toggleEmployeeCode());
  }

  newEmployee(): void {
    this.store.dispatch(EmployeePageActions.initializeCurrentEmployee());
  }

  employeeSelected(employee: Employee): void {
    this.store.dispatch(EmployeePageActions.setCurrentEmployee({ currentEmployeeId: employee.id ? employee.id : 0 }));
  }

  deleteEmployee(employee: Employee): void {
    this.store.dispatch(EmployeePageActions.deleteEmployee({ employeeId: employee.id ? employee.id : 0 }));
  }

  clearEmployee(): void {
    this.store.dispatch(EmployeePageActions.clearCurrentEmployee());
  }
  saveEmployee(employee: Employee): void {
    this.store.dispatch(EmployeePageActions.createEmployee({ employee }));
  }

  updateEmployee(employee: Employee): void {
    this.store.dispatch(EmployeePageActions.updateEmployee({ employee }));
  }
  updateEmployeeList(fileName: string): void {
    this.store.dispatch(EmployeePageActions.uploadEmployeeList({ fileName }));
    this.store.dispatch(EmployeePageActions.updateFileList());
  }

  deleteFile(fileName: string): void {
    this.store.dispatch(EmployeePageActions.deleteFile({ fileName }));
  }
}
