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

  reportForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    requestedAssessor: new FormControl('', Validators.required),
    fileLink: new FormControl('', Validators.required),
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
        FileLink: this.reportForm.value['fileLink'] as string,
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
