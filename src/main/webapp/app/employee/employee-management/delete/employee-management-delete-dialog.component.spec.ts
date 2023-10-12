jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { EmployeeManagementService } from '../service/employee-management.service';

import { EmployeeManagementDeleteDialogComponent } from './employee-management-delete-dialog.component';

describe('Employee Management Delete Component', () => {
  let comp: EmployeeManagementDeleteDialogComponent;
  let fixture: ComponentFixture<EmployeeManagementDeleteDialogComponent>;
  let service: EmployeeManagementService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployeeManagementDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EmployeeManagementDeleteDialogComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EmployeeManagementService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of({}));

        // WHEN
        comp.confirmDelete('employee');
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith('employee');
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));
  });
});
