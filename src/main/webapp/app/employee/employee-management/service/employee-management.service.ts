import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { IEmployee } from '../employee-management.model';

@Injectable({ providedIn: 'root' })
export class EmployeeManagementService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/employee');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.resourceUrl, employee);
  }

  update(employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(this.resourceUrl, employee);
  }

  find(login: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.resourceUrl}/${login}`);
  }

  query(req?: Pagination): Observable<HttpResponse<IEmployee[]>> {
    const options = createRequestOption(req);
    return this.http.get<IEmployee[]>(this.resourceUrl + '/employees', { params: options, observe: 'response' });
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('api/authorities'));
  }
}
