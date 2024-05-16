import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeeting } from '../../core/models/meeting.model';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum Months {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  createMeeting(data: IMeeting): Observable<CommonHttpResponse<IMeeting>> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IMeeting>>(environment.ApiBaseUrl + '/createMeeting', data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  updateMeeting(data: IMeeting): Observable<CommonHttpResponse<IMeeting>> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IMeeting>>(environment.ApiBaseUrl + '/updateMeeting', data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  getMeetings(year: number, month: Months): Observable<CommonHttpResponse<IMeeting[]>> {
    const monthDateRange = this.getStartAndEndDate(year, month);
    const data = {
      StartingDate: monthDateRange.startDate,
      EndingDate: monthDateRange.endDate
    };

    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IMeeting[]>>(environment.ApiBaseUrl + '/getMeetings', data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  private getStartAndEndDate(year: number, month: Months): { startDate: Date, endDate: Date } {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    return { startDate, endDate };
  }

}
