import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeeting } from '../../core/models/meeting.model';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  createMeeting(data: IMeeting): Observable<any> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IMeeting>>(environment.ApiBaseUrl + '/createMeeting', data).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }
}
