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
    path: 'admin-dashboard',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
    canActivate: [NavigationGuard],
    title: 'Home',
    data: {
      authFailedRedirection: authFailedRedirection,
    }
  },
  {
    path: 'assessor-dashboard',
    loadChildren: () => import('../assessor/assessor.module').then(m => m.AssessorModule),
    canActivate: [NavigationGuard],
    title: 'Home',
    data: {
      authFailedRedirection: authFailedRedirection,
    }
  },
  {
    path: 'faculty-dashboard',
    loadChildren: () => import('../faculty/faculty.module').then(m => m.FacultyModule),
    canActivate: [NavigationGuard],
    title: 'Home',
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

