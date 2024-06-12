import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessorDefaultComponent } from './assessor-default/assessor-default.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AssessorDefaultComponent,
    children: [
      {
        path: 'meetings',
        loadChildren: () => import('../meetings/meetings.module').then(m => m.MeetingsModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule),
      }
    ]
  }
];

@NgModule({
  declarations: [
    AssessorDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AssessorModule { }
