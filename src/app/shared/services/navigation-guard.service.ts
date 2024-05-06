// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(route: any, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(observer => {
      const redirectUrl = route._routerState.url;

      const refreshToken = this.loginService.getCookies('refresh_token');

      if (refreshToken) {
        const userInfo = this.loginService.getDecodedAccessToken(refreshToken);
        const currentDate = new Date()
        const expiry = new Date(userInfo.exp * 1000);
        const isApplicationUser = expiry >= currentDate;

        if (isApplicationUser && redirectUrl !== '/login') {
          observer.next(true);
        } else if (!isApplicationUser) {
          this.loginService.setCookie('refresh_token', "");
          this.loginService.setCookie('access_token', "");
          this.loginService.setCookie('user_id', "");

          localStorage.setItem('access_token', "");

          this.router.navigate(['/login']);
          observer.next(false);
        }
      } else {
        if (redirectUrl === '/login') {
          observer.next(true);
        } else {
          this.router.navigate(['/login']);
          observer.next(false);
        }
      }
    });
  }
}
