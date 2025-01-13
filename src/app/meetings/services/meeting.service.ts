import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { IMeeting } from '../../core/models/meeting.model';
import { LoginService } from '../../login/services/login.service';

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

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

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

  deleteMeeting(id: string): Observable<CommonHttpResponse<IMeeting>> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IMeeting>>(environment.ApiBaseUrl + '/deleteMeeting', { id: id }).pipe(first()).subscribe(res => {
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

  createNotification(permission: Array<string>, reportId: string, title: string): Observable<any> {
    return new Observable(observer => {
      const data = {
        EntityName: 'Meeting',
        EntityId: reportId,
        NotificationText: `${title} meeting has been created`,
        UserId: this.loginService.getCookies('user_id'),
        Permission: [
          this.loginService.getCookies('user_id'),
          ...permission
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

  private getStartAndEndDate(year: number, month: Months): { startDate: Date, endDate: Date } {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    return { startDate, endDate };
  }

}
