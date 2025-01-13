import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonHttpResponse } from '../../core/common-http-response.model';
import { IUser, IUserList } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(limit: number = 10, skip: number = 0): Observable<IUserList> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IUserList>>(environment.ApiBaseUrl + '/getUsers', { Limit: limit, Skip: skip }).pipe(first()).subscribe(res => {
        observer.next(res.Data);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  createuser(Name: string, Email: string, Password: string, Role: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IUser>>(environment.ApiBaseUrl + '/createUser', {
        Name: Name,
        Email: Email,
        Password: Password,
        Role: Role
      }).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  updateUser(UserId: string, Name: string, Email: string, Role: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IUser>>(environment.ApiBaseUrl + '/updateUser', {
        id: UserId,
        Name: Name,
        Email: Email,
        Role: Role
      }).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  deleteUser(UserId: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<CommonHttpResponse<IUser>>(environment.ApiBaseUrl + '/deleteUser', {
        id: UserId
      }).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }
}
