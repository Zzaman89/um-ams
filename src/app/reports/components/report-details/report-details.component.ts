import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { IReport } from '../../../core/models/report.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReportDeleteComponent } from '../report-delete/report-delete.component';
import { ReportUpdateComponent } from '../report-update/report-update.component';
import { ReportStatusUpdateComponent } from '../report-status-update/report-status-update.component';
import { IComment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss'
})
export class ReportDetailsComponent implements OnInit, OnDestroy {
  routeSub: Subscription = new Subscription();
  reportId: string = '';
  data: IReport = {} as IReport;
  comments!: Array<IComment>;
  comment: string = '';
  isCommentLoading = false;

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

  getComments(): void {
    this.reportService.getComments(this.reportId).pipe(first()).subscribe(res => {
      this.comments = res;
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

  updateReportStatus(): void {
    const ref = this.dialog.open(ReportStatusUpdateComponent, {
      data: {
        ReportId: this.data._id,
        CurrentStatus: this.data.Status
      },
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

  createComment(): void {
    this.isCommentLoading = true;

    this.reportService.createComment(this.reportId, this.comment).pipe(first()).subscribe(res => {
      this.isCommentLoading = false;
      this.comment = '';

      this.getComments();
    });
  }

  timeAgo(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  }


  ngOnInit(): void {
    this.routeSub = this.activeRoute.params.subscribe(params => {
      this.reportId = params['id'];

      if (this.reportId) {
        this.getReport();
        this.getComments();
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
