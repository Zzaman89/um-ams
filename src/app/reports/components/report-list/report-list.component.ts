import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { IReport } from '../../../core/models/report.model';
import { ReportService } from '../../services/report.service';
import { ReportCreateComponent } from '../report-create/report-create.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent {
  data: IReport[] = [];
  totalCount!: number;
  displayedColumns: string[] = ['Title', 'AssignedAssessor', 'ReportOwner', 'Status'];

  constructor(
    private reportService: ReportService,
    public dialog: MatDialog,
    public route: Router
  ) { }


  getReports(limit: number = 10, skip: number = 0): void {
    this.reportService.getReports(limit, skip).pipe(first()).subscribe(res => {
      this.data = res.Data;
      this.totalCount = res.Total;
    });
  }


  openReportCreateModal(): void {
    const ref = this.dialog.open(ReportCreateComponent, {
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });


    ref.afterClosed().subscribe(_ => {
      this.getReports();
    });
  }

  routeToReportDetails(report: IReport): void {
    this.route.navigate([`/admin-dashboard/reports/${report._id}`])
  }

  onPageChange(pageConfig: any): void {
    const pageSize = pageConfig.pageSize;
    const skip = pageConfig.pageSize * pageConfig.pageIndex;
    this.getReports(pageSize, skip);
  }

  openUpdateReportModal(report: IReport): void {

  }

  openDeleteReportModal(report: IReport): void {

  }

  ngOnInit(): void {
    this.getReports();
  }
}
