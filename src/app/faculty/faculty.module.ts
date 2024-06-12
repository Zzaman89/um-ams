import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDefaultComponent } from './faculty-default/faculty-default.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FacultyDefaultComponent,
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
    FacultyDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FacultyModule { }
