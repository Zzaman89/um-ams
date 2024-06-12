import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ReportDefaultComponent } from './components/report-default/report-default.component';


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
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
