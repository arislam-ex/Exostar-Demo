jest.mock('app/core/auth/account.service');

import { ComponentFixture, TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EmployeeManagementService } from '../service/employee-management.service';
import { Employee } from '../employee-management.model';
import { AccountService } from 'app/core/auth/account.service';

import { EmployeeManagementComponent } from './employee-management.component';

describe('Employee Management Component', () => {
  let comp: EmployeeManagementComponent;
  let fixture: ComponentFixture<EmployeeManagementComponent>;
  let service: EmployeeManagementService;
  let mockAccountService: AccountService;
  const data = of({
    defaultSort: 'id,asc',
  });
  const queryParamMap = of(
    jest.requireActual('@angular/router').convertToParamMap({
      page: '1',
      size: '1',
      sort: 'id,desc',
    })
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployeeManagementComponent],
      providers: [{ provide: ActivatedRoute, useValue: { data, queryParamMap } }, AccountService],
    })
      .overrideTemplate(EmployeeManagementComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmployeeManagementService);
    mockAccountService = TestBed.inject(AccountService);
    mockAccountService.identity = jest.fn(() => of(null));
  });

  describe('OnInit', () => {
    it('Should call load all on init', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        const headers = new HttpHeaders().append('link', 'link;link');
        jest.spyOn(service, 'query').mockReturnValue(
          of(
            new HttpResponse({
              body: [new Employee(123)],
              headers,
            })
          )
        );

        // WHEN
        comp.ngOnInit();
        tick(); // simulate async

        // THEN
        expect(service.query).toHaveBeenCalled();
        expect(comp.employees?.[0]).toEqual(expect.objectContaining({ id: 123 }));
      })
    ));
  });

  describe('setActive', () => {
    it('Should update employee and call load all', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        const headers = new HttpHeaders().append('link', 'link;link');
        const employee = new Employee(123);
        jest.spyOn(service, 'query').mockReturnValue(
          of(
            new HttpResponse({
              body: [employee],
              headers,
            })
          )
        );
        jest.spyOn(service, 'update').mockReturnValue(of(employee));

        // WHEN
        comp.setActive(employee, true);
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith({ ...employee, activated: true });
        expect(service.query).toHaveBeenCalled();
        expect(comp.employees?.[0]).toEqual(expect.objectContaining({ id: 123 }));
      })
    ));
  });
});
