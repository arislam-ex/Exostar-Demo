import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'jhi-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  pageTitle = 'Employees';

  @Input() errorMessage: string;
  @Input() employees: Employee[];
  @Input() displayCode: boolean;
  @Input() selectedEmployee: Employee;
  @Output() displayCodeChanged = new EventEmitter<void>();
  @Output() initializeNewEmployee = new EventEmitter<void>();
  @Output() employeeWasSelected = new EventEmitter<Employee>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newEmployee(): void {
    this.initializeNewEmployee.emit();
  }

  employeeSelected(employee: Employee): void {
    this.employeeWasSelected.emit(employee);
  }
}
