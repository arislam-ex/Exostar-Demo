import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Employee } from './employee';

export class employeesData implements InMemoryDbService {
  createDb(): Employee[] {
    const employees: Employee[] = [
      {
        id: 1,
        employeeName: 'Richard Wychof',
        employeeCode: 'EMP-0011',
        address: '101 Lake View, TX-11111',
        starRating: 3.2,
      },
      {
        id: 2,
        employeeName: 'Angela Hon',
        employeeCode: 'EMP-0023',
        address: '15 Ridge Lane, TX-12123',
        starRating: 4.2,
      },
      {
        id: 5,
        employeeName: 'Robert Murray',
        employeeCode: 'EMP-0048',
        address: '20 Galena Dr, TX-78823',
        starRating: 4.8,
      },
      {
        id: 8,
        employeeName: 'Andrew Young',
        employeeCode: 'EMP-0022',
        address: '15 TechRidge Dr, TX-33122',
        starRating: 3.7,
      },
      {
        id: 10,
        employeeName: 'Video Game Controller',
        employeeCode: 'EMP-0042',
        address: 'Standard two-button video game controller',
        starRating: 4.6,
      },
    ];
    return employees;
  }
}
