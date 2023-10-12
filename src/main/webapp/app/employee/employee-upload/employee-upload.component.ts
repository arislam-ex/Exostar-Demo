import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeUploadService } from './employee-upload.service';

@Component({
  selector: 'jhi-employee-upload',
  templateUrl: './employee-upload.component.html',
  styleUrls: ['./employee-upload.component.css'],
})
export class EmployeeUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  ascending!: boolean;
  @Output() fileWasUploaded = new EventEmitter<string>();
  @Output() fileWasDeleted = new EventEmitter<string>();

  constructor(private uploadService: EmployeeUploadService) {}

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  fileSelected(file: File): void {
    this.currentFile = file;
    this.fileWasUploaded.emit(file.name);
  }

  fileDeleted(file: File): void {
    this.currentFile = file;
    this.fileWasDeleted.emit(file.name);
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              this.fileWasUploaded.emit(file.name);
            }
          },
          error: (err: any) => {
            this.progress = 0;

            if (err.error?.err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the employee!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
