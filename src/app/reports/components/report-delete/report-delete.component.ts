import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { IReport } from '../../../core/models/report.model';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-delete',
  templateUrl: './report-delete.component.html',
  styleUrl: './report-delete.component.scss'
})
export class ReportDeleteComponent {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IReport,
    public dialogRef: MatDialogRef<ReportDeleteComponent>,
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) { }

  deleteReport(): void {
    this.isLoading = true;

    console.log(this.data._id)
    this.reportService.deleteReport(this.data._id).pipe(first()).subscribe(res => {
      this.isLoading = false;

      if (!res.IsValid) {
        this.snackBar.open('Couldn\'t delete report.', undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }

      if (res.IsValid) {
        this.snackBar.open('Report deleted successfully', undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }

      this.dialogRef.close();
    });
  }
}
