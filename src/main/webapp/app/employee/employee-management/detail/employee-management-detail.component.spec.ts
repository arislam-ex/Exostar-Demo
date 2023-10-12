import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Authority } from 'app/config/authority.constants';
import { Employee } from '../employee-management.model';

import { EmployeeManagementDetailComponent } from './employee-management-detail.component';

describe('Employee Management Detail Component', () => {
  let comp: EmployeeManagementDetailComponent;
  let fixture: ComponentFixture<EmployeeManagementDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeManagementDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ employee: new Employee(123, 'employee', 'first', 'last', 'first@last.com', true, 'en', [Authority.USER], 'admin') }),
          },
        },
      ],
    })
      .overrideTemplate(EmployeeManagementDetailComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.employee).toEqual(
        expect.objectContaining({
          id: 123,
          login: 'employee',
          firstName: 'first',
          lastName: 'last',
          email: 'first@last.com',
          activated: true,
          langKey: 'en',
          authorities: [Authority.USER],
          createdBy: 'admin',
        })
      );
    });
  });
});
