import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { IReport, IReportList } from '../../core/models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

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

  uploadFile(file: File): Observable<any> {
    return of([]);
  }
}
