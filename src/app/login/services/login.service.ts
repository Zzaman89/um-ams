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

  getToken(user: ILogin): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(environment.ApiBaseUrl + '/getToken', user).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }

  getDecodedAccessToken(token: string): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

  getDefaultRouteForRole(role: string): string {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'faculty':
        return '/faculty-dashboard';
      case 'assessor':
        return '/assessor-dashboard';
      default:
        return '/404';
    }
  }

  getAvailableRoutesForRole(role: string): Array<string> {
    switch (role) {
      case 'admin':
        return ['users', 'meetings', 'reports'];
      case 'faculty':
        return ['meetings', 'reports'];
      case 'assessor':
        return ['meetings', 'reports'];
      default:
        return [];
    }
  }

  logout(): void {
    this.setCookie("refresh_token", "");
    this.setCookie("access_token", "");
    this.setCookie("user_id", "");

    localStorage.setItem('access_token', "");

    this.router.navigate(['/login']);
  }
}
