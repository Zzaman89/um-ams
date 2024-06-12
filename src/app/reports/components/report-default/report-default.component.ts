import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReport } from '../../../core/models/report.model';
import { ReportService } from '../../services/report.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-report-default',
  templateUrl: './report-default.component.html',
  styleUrl: './report-default.component.scss'
})
export class ReportDefaultComponent implements OnInit {
  data: IReport[] = [];
  displayedColumns: string[] = ['Name', 'Title', 'AssignedAssessor', 'ReportOwner', 'Status', 'Actions'];

  constructor(
    private reportService: ReportService
  ) { }


  getReports(): void {
    this.reportService.getReports().pipe(first()).subscribe(res => {
      this.data = res;
    });
  }


  openReportCreateModal(): void {

  }

  openUpdateReportModal(report: IReport): void {

  }

  openDeleteReportModal(report: IReport): void {

  }

  ngOnInit(): void {
    this.getReports();
  }
}
