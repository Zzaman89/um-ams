import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { IReport } from '../../../core/models/report.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReportDeleteComponent } from '../report-delete/report-delete.component';
import { ReportUpdateComponent } from '../report-update/report-update.component';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent implements OnInit, OnDestroy {
  routeSub: Subscription = new Subscription();
  reportId: string = '';
  data: IReport = {} as IReport;

  constructor(
    public reportService: ReportService,
    public activeRoute: ActivatedRoute,
    public location: Location,
    public dialog: MatDialog
  ) { }

  getReport(): void {
    this.reportService.getReportbyId(this.reportId).pipe(first()).subscribe(res => {
      this.data = res;
    });
  }

  updateReport(): void {
    const ref = this.dialog.open(ReportUpdateComponent, {
      data: this.data,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    ref.afterClosed().subscribe(_ => {
      this.getReport();
    });
  }

  deleteReport(): void {
    const ref = this.dialog.open(ReportDeleteComponent, {
      data: this.data,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    ref.afterClosed().subscribe(_ => {
      this.location.back();
    });
  }

  ngOnInit(): void {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      this.reportId = params['id'];

      if (this.reportId) {
        this.getReport();
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
