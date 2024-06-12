import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReport } from '../../../core/models/report.model';
import { ReportService } from '../../services/report.service';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReportCreateComponent } from '../report-create/report-create.component';

@Component({
  selector: 'app-report-default',
  templateUrl: './report-default.component.html',
  styleUrl: './report-default.component.scss'
})
export class ReportDefaultComponent implements OnInit {
  data: IReport[] = [];
  displayedColumns: string[] = ['Title', 'AssignedAssessor', 'ReportOwner', 'Status', 'Actions'];

  constructor(
    private reportService: ReportService,
    public dialog: MatDialog
  ) { }


  getReports(): void {
    this.reportService.getReports().pipe(first()).subscribe(res => {
      this.data = res;
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

  openDetailsReportModal(report: IReport): void {

  }

  openUpdateReportModal(report: IReport): void {

  }

  openDeleteReportModal(report: IReport): void {

  }

  ngOnInit(): void {
    this.getReports();
  }
}
