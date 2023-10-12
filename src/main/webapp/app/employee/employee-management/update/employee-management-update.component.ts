import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IEmployee } from '../employee-management.model';
import { EmployeeManagementService } from '../service/employee-management.service';

const employeeTemplate = {} as IEmployee;

const newEmployee: IEmployee = {
  activated: true,
} as IEmployee;

@Component({
  selector: 'jhi-employee-mgmt-update',
  templateUrl: './employee-management-update.component.html',
})
export class EmployeeManagementUpdateComponent implements OnInit {
  authorities: string[] = [];
  isSaving = false;

  editForm = new FormGroup({
    id: new FormControl(employeeTemplate.id),
    login: new FormControl(employeeTemplate.login, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    firstName: new FormControl(employeeTemplate.firstName, { validators: [Validators.maxLength(50)] }),
    lastName: new FormControl(employeeTemplate.lastName, { validators: [Validators.maxLength(50)] }),
    email: new FormControl(employeeTemplate.email, {
      nonNullable: true,
      validators: [Validators.minLength(5), Validators.maxLength(254), Validators.email],
    }),
    activated: new FormControl(employeeTemplate.activated, { nonNullable: true }),
    authorities: new FormControl(employeeTemplate.authorities, { nonNullable: true }),
  });

  constructor(private employeeService: EmployeeManagementService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ employee }) => {
      if (employee) {
        this.editForm.reset(employee);
      } else {
        this.editForm.reset(newEmployee);
      }
    });
    this.employeeService.authorities().subscribe(authorities => (this.authorities = authorities));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.editForm.getRawValue();
    if (employee.id !== null) {
      this.employeeService.update(employee).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    } else {
      this.employeeService.create(employee).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    }
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
