import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { UtilityService } from '../../../shared/services/utility.service';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss']
})
export class RootDefaultComponent implements OnInit {
  isLogin: boolean = false;
  currentRoute: string = '/';
  currentUserRoute: string[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) { }

  dynamicRouteTitleSetter(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child: ActivatedRoute | null = this.route.firstChild;
          let title = child && child.snapshot.data['title'];
          if (title) {
            return title;
          }
        })
      )
      .subscribe((title) => {
        if (title) {
          this.utilityService.changetitle(`${title} - UM AMS`);
        }
      });
  }

  logout(): void {
    this.loginService.logout();
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.isLogin = val.url === '/login' || val.urlAfterRedirects === '/login' ? true : false;
        this.currentRoute = val.url;
        const userInfo = this.loginService.getDecodedAccessToken(this.loginService.getCookies('access_token'));
        this.currentUserRoute = this.loginService.getAvailableRoutesForRole(userInfo?.data?.Role);
      }
    });
  }
}
