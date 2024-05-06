import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LoginService } from '../../../login/services/login.service';
import { environment } from './../../../../environments/environment';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss']
})
export class RootDefaultComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
  ) { }

  setRequiedCookcies(): void {
    this.loginService.setCookie('client_id', "test_123");
    this.loginService.setCookie('client_secret', "test_123");
  }

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

  ngOnInit(): void {
    const TenantId = this.loginService.getCookies('client_id');

    if (!TenantId) {
      this.setRequiedCookcies();
    } else if (TenantId !== environment.TenantId) {
      this.setRequiedCookcies();
    }
  }
}
