import { ComponentFixture, TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Authority } from 'app/config/authority.constants';
import { EmployeeManagementService } from '../service/employee-management.service';
import { Employee } from '../employee-management.model';

import { EmployeeManagementUpdateComponent } from './employee-management-update.component';

describe('Employee Management Update Component', () => {
  let comp: EmployeeManagementUpdateComponent;
  let fixture: ComponentFixture<EmployeeManagementUpdateComponent>;
  let service: EmployeeManagementService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployeeManagementUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ employee: new Employee(123, 'employee', 'first', 'last', 'first@last.com', true, 'en', [Authority.USER], 'admin') }),
          },
        },
      ],
    })
      .overrideTemplate(EmployeeManagementUpdateComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementUpdateComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmployeeManagementService);
  });

  describe('OnInit', () => {
    it('Should load authorities and language on init', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'authorities').mockReturnValue(of(['USER']));

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.authorities).toHaveBeenCalled();
        expect(comp.authorities).toEqual(['USER']);
      })
    ));
  });

  describe('save', () => {
    it('Should call update service on save for existing employee', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        const entity = { id: 123 };
        jest.spyOn(service, 'update').mockReturnValue(of(entity));
        comp.editForm.patchValue(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(expect.objectContaining(entity));
        expect(comp.isSaving).toEqual(false);
      })
    ));

    it('Should call create service on save for new employee', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        const entity = { login: 'foo' } as Employee;
        jest.spyOn(service, 'create').mockReturnValue(of(entity));
        comp.editForm.patchValue(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(comp.editForm.getRawValue().id).toBeNull();
        expect(service.create).toHaveBeenCalledWith(expect.objectContaining(entity));
        expect(comp.isSaving).toEqual(false);
      })
    ));
  });
});
