import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { find as _find, map as _map } from 'lodash';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILogin } from '../../core/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getCookies(type: string): string {
    const currentCookies = _map(document.cookie.split(';'), (o: string) => o.trim());
    const regex = new RegExp(type, 'i');
    let requestCookieValue = null;

    _find(currentCookies, (o: string) => {
      if (o.match(regex)) {
        requestCookieValue = o.split('=')[1];
      }
    });

    return requestCookieValue ?? '';
  }

  setCookie(type: string, value: string): void {
    document.cookie = `${type}=${value}`;
  }

  getGetIdentity(): Observable<any> {
    return this.http.get<any>(environment.ApiBaseUrl + '/GetIdentity', {});
  }

  getToken(granttype: string, user?: ILogin): Observable<any> {
    return new Observable(observer => {
      switch (granttype) {
        case 'refresh_token':

          const refreshTokenData = `client_id=${this.getCookies('client_id')}&client_secret=${this.getCookies('client_secret')}&grant_type=refresh_token&refresh_token=${this.getCookies('refresh_token')}`;
          this.http.post<any>(environment.ApiBaseUrl + '/login', refreshTokenData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).pipe(first()).subscribe(res => {
            observer.next(res);
          }, error => {
            observer.next(false);
          });

          break;
        case 'password':
          this.http.post<any>(environment.ApiBaseUrl + '/login', user).pipe(first()).subscribe(res => {
            observer.next(res);
          }, error => {
            observer.next(error.error);
          });
          break;
        default:
          observer.next(false);
      }
    });
  }

  getDecodedAccessToken(token: string): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

  logout(): void {
    this.setCookie("refresh_token", "");
    this.setCookie("access_token", "");
    this.setCookie("user_id", "");

    localStorage.setItem('access_token', "");

    this.router.navigate(['/login']);
  }
}
