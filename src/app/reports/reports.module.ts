import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AvatarModule } from 'ngx-avatars';
import { MaterialModule } from '../shared/material.module';
import { ReportCreateComponent } from './components/report-create/report-create.component';
import { ReportDefaultComponent } from './components/report-default/report-default.component';
import { ReportDeleteComponent } from './components/report-delete/report-delete.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportStatusUpdateComponent } from './components/report-status-update/report-status-update.component';
import { ReportUpdateComponent } from './components/report-update/report-update.component';


const routes: Routes = [
  {
    path: '',
    component: ReportDefaultComponent,
    children: [
      {
        path: '',
        component: ReportListComponent,
      },
      {
        path: ':id',
        component: ReportDetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ReportListComponent,
    ReportDefaultComponent,
    ReportCreateComponent,
    ReportDetailsComponent,
    ReportDeleteComponent,
    ReportUpdateComponent,
    ReportStatusUpdateComponent
  ],
  imports: [
    AvatarModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PdfViewerModule
  ]
})
export class ReportsModule { }
