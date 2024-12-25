import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { environment } from '../../../environments/environment';
import { DashBoardStatistics } from '../../core/models/dashboard-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardStatistics(): Observable<any> {
    return new Observable(observer => {
      this.http.get<CommonHttpResponse<DashBoardStatistics>>(environment.ApiBaseUrl + '/getDashboardStatistics').pipe(first()).subscribe(res => {
        observer.next(res.Data);
      }, error => {
        observer.next(error.error);
      });
    });
  }
}
