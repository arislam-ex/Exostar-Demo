import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from '../employee';
import { GenericValidator } from '../../shared/validator/generic-validator';
import { NumberValidators } from '../../shared/validator/number.validator';

@Component({
  selector: 'jhi-employee-edit',
  templateUrl: './employee-edit.component.html',
})
export class EmployeeEditComponent implements OnInit, OnChanges {
  pageTitle = 'Employee Edit';
  @Input() errorMessage: string;
  @Input() selectedEmployee: Employee;
  @Output() create = new EventEmitter<Employee>();
  @Output() update = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();
  @Output() clearCurrent = new EventEmitter<void>();

  employeeForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      employeeName: {
        required: 'Employee name is required.',
        minlength: 'Employee name must be at least three characters.',
        maxlength: 'Employee name cannot exceed 50 characters.',
      },
      employeeCode: {
        required: 'Employee code is required.',
      },
      starRating: {
        range: 'Rate the employee between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      employeeCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', Validators.required],
      address: '',
    });

    // Watch for value changes for validation
    this.employeeForm.valueChanges.subscribe(() => (this.displayMessage = this.genericValidator.processMessages(this.employeeForm)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // patch form with value from the store
    if (changes.selectedEmployee) {
      const employee = changes.selectedEmployee.currentValue as Employee;
      this.displayEmployee(employee);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.employeeForm);
  }

  displayEmployee(employee: Employee | null): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (employee && this.employeeForm) {
      // Reset the form back to pristine
      this.employeeForm.reset();

      // Display the appropriate page title
      if (employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${employee.firstName ? employee.firstName : ''}`;
      }

      // Update the data on the form
      this.employeeForm.patchValue({
        firstName: employee.firstName,
        lastName: employee.firstName,
        employeeCode: employee.employeeCode,
        starRating: employee.starRating,
        address: employee.address,
        city: employee.city,
        state: employee.state,
        zip: employee.zip,
        email: employee.email,
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected employee
    // replacing any edits made
    this.displayEmployee(this.selectedEmployee);
  }

  deleteEmployee(): void {
    if (this.selectedEmployee.id) {
      if (confirm(`Really delete the employee: ${this.selectedEmployee.firstName || ''}?`)) {
        this.delete.emit(this.selectedEmployee);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      if (this.employeeForm.dirty) {
        // Copy over all of the original employee properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const employee = { ...this.selectedEmployee, ...this.employeeForm.value };

        if (employee.id === 0) {
          this.create.emit(employee);
        } else {
          this.update.emit(employee);
        }
      }
    }
  }
}
