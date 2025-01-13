import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { IReport, IReportList } from '../../core/models/report.model';
import { IComment } from '../../core/models/comment.model';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getReports(limit: number = 10, skip: number = 0): Observable<IReportList> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IReportList>>(environment.ApiBaseUrl + '/getReports', { Limit: limit, Skip: skip }).pipe(first()).subscribe(res => {
        observer.next(res.Data);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  getReportbyId(reportId: string): Observable<any> {
    return new Observable(observer => {
      this.http.get<CommonHttpResponse<IReport>>(environment.ApiBaseUrl + `/getReport/${reportId}`).pipe(first()).subscribe(res => {
        observer.next(res.Data);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  createReport(data: IReport): Observable<CommonHttpResponse<IReport>> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IReport>>(environment.ApiBaseUrl + '/createReport', data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  updateReport(data: IReport): Observable<CommonHttpResponse<IReport>> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IReport>>(environment.ApiBaseUrl + '/updateReport', data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  deleteReport(reportId: string): Observable<CommonHttpResponse<IReport>> {
    return new Observable(observer => {
      this.http.delete<CommonHttpResponse<IReport>>(environment.ApiBaseUrl + `/deleteReport/${reportId}`).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  updateReportStatus(reportId: string, status: string): Observable<any> {
    return new Observable(observer => {
      const data = {
        _id: reportId,
        Status: status
      }
      this.http.post<any>(environment.ApiBaseUrl + `/updateReportStatus`, data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  getComments(reportId: string): Observable<Array<IComment>> {
    return new Observable(observer => {
      this.http.get<CommonHttpResponse<Array<IComment>>>(environment.ApiBaseUrl + `/getComments/${reportId}`).pipe(first()).subscribe(res => {
        observer.next(res.Data);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  createComment(reportId: string, comment: string): Observable<any> {
    return new Observable(observer => {
      const data = {
        EntityName: 'Report',
        EntityId: reportId,
        Comment: comment,
        UserId: this.loginService.getCookies('user_id'),
        UserName: this.loginService.getCookies('user_name')
      };

      this.http.post<any>(environment.ApiBaseUrl + `/createComment`, data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  createNotification(accessortId: string, reportId: string, title: string, type: string): Observable<any> {
    return new Observable(observer => {
      const data = {
        EntityName: 'Report',
        EntityId: reportId,
        NotificationText: this.notificationTextHelper(title, type),
        UserId: this.loginService.getCookies('user_id'),
        Permission: [
          this.loginService.getCookies('user_id'),
          accessortId
        ],
        UserName: this.loginService.getCookies('user_name')
      };

      this.http.post<any>(environment.ApiBaseUrl + `/createNotification`, data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  private notificationTextHelper(title: string, type: string): string {
    let notificationText = '';

    switch (type) {
      case 'Created':
        notificationText = `Report '${title}' has been created`;
        break;
      case 'Updated':
        notificationText = `Report '${title}' has been updated`;
        break;
      case 'Commented':
        notificationText = `New comment on report '${title}'`;
        break;
      case 'Status':
        notificationText = `'${title}' reports status has been updated`;
        break;
      default:
        notificationText = '';
        break;
    }

    return notificationText;
  }
}
