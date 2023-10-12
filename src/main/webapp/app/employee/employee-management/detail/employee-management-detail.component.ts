import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Employee } from '../employee-management.model';

@Component({
  selector: 'jhi-employee-mgmt-detail',
  templateUrl: './employee-management-detail.component.html',
})
export class EmployeeManagementDetailComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ employee }) => {
      this.employee = employee;
    });
  }
}
