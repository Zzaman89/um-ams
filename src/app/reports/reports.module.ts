import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDefaultComponent } from './report-default/report-default.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ReportDefaultComponent
  }
];

@NgModule({
  declarations: [
    ReportDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
