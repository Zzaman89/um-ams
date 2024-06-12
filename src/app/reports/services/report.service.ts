import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { IReport } from '../../core/models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReports(limit: number = 10, skip: number = 0): Observable<any> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<Array<IReport>>>(environment.ApiBaseUrl + '/getReports', { Limit: limit, Skip: skip }).pipe(first()).subscribe(res => {
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

}
