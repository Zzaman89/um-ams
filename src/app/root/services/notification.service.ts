import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login/services/login.service';
import { first, Observable } from 'rxjs';
import { INotification } from '../../core/models/notification.model';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getNotifications(): Observable<Array<INotification>> {
    return new Observable(observer => {
      this.http.get<CommonHttpResponse<Array<INotification>>>(environment.ApiBaseUrl + `/getNotifications/${this.loginService.getCookies('user_id')}`).pipe(first()).subscribe(res => {
        observer.next(res.Data);
      }, error => {
        observer.next(error.error);
      });
    });
  }
}
