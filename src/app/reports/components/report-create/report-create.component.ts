import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../users/services/user.service';
import { first } from 'rxjs';
import { IUser } from '../../../core/models/user.model';
import { IReport } from '../../../core/models/report.model';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrl: './report-create.component.scss'
})
export class ReportCreateComponent implements OnInit {
  isLoading: boolean = false;
  users: Array<IUser> = [];
  formData: FormData = new FormData();
  file?: File;
  base64File!: string;
  fileName?: string;

  reportForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    requestedAssessor: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<ReportCreateComponent>,
    private reportService: ReportService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  createReport(): void {
    this.isLoading = true;

    if (this.reportForm.valid) {
      const data: IReport = {
        _id: '',
        Title: this.reportForm.value['title'] as string,
        CreatedByUserId: '',
        CreatedByUserName: '',
        Description: this.reportForm.value['description'] as string,
        CreatedDate: new Date(),
        ApprovedDate: new Date(),
        RequestedAssessor: [{
          UserId: (this.reportForm.value['requestedAssessor'] as unknown as IUser)._id,
          UserName: (this.reportForm.value['requestedAssessor'] as unknown as IUser).Name
        }],
        FileLink: this.base64File,
        Status: ''
      };


      this.reportService.createReport(data).pipe(first()).subscribe(res => {
        this.isLoading = false;

        if (!res.IsValid) {
          this.snackBar.open('Couldn\'t create report.', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }

        if (res.IsValid) {
          this.snackBar.open('Report created successfully', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });

          this.reportService.createNotification(data.RequestedAssessor[0].UserId, res.Data._id, data.Title, 'Created').pipe(first()).subscribe();
        }

        this.dialogRef.close();
      });
    }
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    if (this.file?.type != 'application/pdf') { return; }

    this.convertFileToBase64(this.file).then((base64: string) => {
      this.base64File = base64;
    });

    if (this.file) {

      this.fileName = this.file.name;
    }
  }

  onFileRemove(): void {
    this.file = undefined;
    this.fileName = undefined;

    const elem: any = document.getElementById('fileUpload');

    if (elem)
      elem.value = null;
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject('File could not be read.');
        }
      };
      reader.onerror = () => reject('Error reading file.');
      reader.readAsDataURL(file);
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(res => {
      this.users = res.Data;
    });
  }
}
