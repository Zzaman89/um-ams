import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-status-update',
  templateUrl: './report-status-update.component.html',
  styleUrl: './report-status-update.component.scss'
})
export class ReportStatusUpdateComponent {
  isLoading = false;
  statusMap: { [key: string]: string } = {
    '1': 'Send for verification',
    '2': 'Rejected',
    '3': 'Accepted'
  }
  status = '1';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReportStatusUpdateComponent>,
    private reportSerice: ReportService
  ) {
    const curretnStatus = Object.entries(this.statusMap).find(([key, val]) => val === this.data.CurrentStatus);
    this.status = curretnStatus?.[0] || '1';
  }

  updateReportStatus(): void {
    this.isLoading = true;


    this.reportSerice.updateReportStatus(this.data.ReportId, this.statusMap[this.status]).pipe(first()).subscribe(res => {
      this.isLoading = false;

      this.dialogRef.close();
    })
  }
}
