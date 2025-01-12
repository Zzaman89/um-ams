import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { IReport } from '../../../core/models/report.model';
import { ReportService } from '../../services/report.service';
import { IUser } from '../../../core/models/user.model';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-report-update',
  templateUrl: './report-update.component.html',
  styleUrl: './report-update.component.scss'
})
export class ReportUpdateComponent {
  isLoading: boolean = false;
  users: Array<IUser> = [];
  file?: File;
  base64File!: string;
  fileName?: string;
  selectedAccessor!: any;

  reportForm = new FormGroup({
    title: new FormControl(this.data.Title, Validators.required),
    description: new FormControl(this.data.Description, [Validators.required]),
    requestedAssessor: new FormControl(this.data.RequestedAssessor, Validators.required),
    fileLink: new FormControl(this.data.FileLink, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IReport,
    public dialogRef: MatDialogRef<ReportUpdateComponent>,
    private reportService: ReportService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.base64ToFile(this.data.FileLink, this.data.Title);
  }

  updateReport(): void {
    this.isLoading = true;

    if (this.reportForm.valid) {
      const updatedData: IReport = {
        _id: this.data._id,
        Title: this.reportForm.value['title'] as string,
        CreatedByUserId: '',
        CreatedByUserName: '',
        Description: this.reportForm.value['description'] as string,
        RequestedAssessor: (this.reportForm.value['requestedAssessor'] as unknown as any[]).map(x => { return { UserId: x._id, UserName: x.Name }; }),
        FileLink: this.base64File,
        CreatedDate: new Date(),
        ApprovedDate: new Date(),
        Status: ''
      };

      this.reportService.updateReport(updatedData).pipe(first()).subscribe(res => {
        this.isLoading = false;

        if (!res.IsValid) {
          this.snackBar.open('Couldn\'t update report.', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }

        if (res.IsValid) {
          this.snackBar.open('Report updated successfully', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
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

  base64ToFile(base64: string, fileName: string): void {
    if (!this.isBase64(base64)) { return; }
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].match(/:(.*?);/)![1];

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: mimeString });

    this.file = new File([blob], fileName, { type: mimeString });
    this.fileName = fileName;

    console.log('File created:', this.file);
  }

  isBase64(str: string): boolean {
    // Regular expression to validate Base64 format
    const base64Regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?;base64,([a-zA-Z0-9+/=\r\n]+)$/;
    return base64Regex.test(str);
  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(res => {
      this.users = res;

      this.selectedAccessor = this.users.find(x => x._id == this.data.RequestedAssessor[0]?.UserId);
    });
  }
}
