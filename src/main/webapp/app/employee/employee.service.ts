import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Employee } from './employee';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { EmployeeFile } from './employee.file';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = this.applicationConfigService.getEndpointFor('api/employee');
  private employees: Employee[];

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getEmployees(): Observable<any> {
    return this.http.get(`${this.employeesUrl}/all`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Employee Id must be null for the Web API to assign an Id
    const newEmployee = { ...employee, id: null as any };
    return this.http.post<Employee>(this.employeesUrl, newEmployee, { headers }).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url, { headers }).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${employee.id ? employee.id : '1'}`;
    return this.http.put<Employee>(url, employee, { headers }).pipe(
      // Return the employee on an update
      map(() => employee),
      catchError(this.handleError)
    );
  }

  uploadEmployeeList(fileName: string): Observable<Employee[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/${fileName ? fileName : 'all'}`;
    return this.http.get<Employee[]>(url, { headers }).pipe(catchError(this.handleError));
  }

  updateFileList(): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeesUrl}/files`;
    return this.http.get<any[]>(url, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    let errMsg: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = err.error.message ? err.error.message : '';
      errorMessage = `An error occurred: ${errMsg}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errMsg = err.status ? err.status : '';
      errMsg += err.body.error ? err.body.error : '';
      errorMessage = `Backend returned code ${errMsg}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
