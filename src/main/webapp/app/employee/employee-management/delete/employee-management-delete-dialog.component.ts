import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Employee } from '../employee-management.model';
import { EmployeeManagementService } from '../service/employee-management.service';

@Component({
  selector: 'jhi-employee-mgmt-delete-dialog',
  templateUrl: './employee-management-delete-dialog.component.html',
})
export class EmployeeManagementDeleteDialogComponent {
  employee?: Employee;

  constructor(private employeeService: EmployeeManagementService, private activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(login: string): void {
    this.employeeService.delete(login).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
