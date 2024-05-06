// tslint:disable: object-literal-shorthand
import { Route } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { NavigationGuard } from '../shared/services/navigation-guard.service';

export const authFailedRedirection: any = [
  {
    redirectTo: '/login',
  }
];

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
    canActivate: [NavigationGuard],
    title: 'Login - UM AMS',
    data: {
      authFailedRedirection: authFailedRedirection,
    }
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

