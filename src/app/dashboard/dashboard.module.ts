import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardDefaultComponent } from './components/dashboard-default/dashboard-default.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: DashboardDefaultComponent
  }
];

@NgModule({
  declarations: [
    DashboardDefaultComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
