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
  ) { }

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
        FileLink: this.reportForm.value['fileLink'] as string,
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

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(res => {
      this.users = res;
    });
  }
}
