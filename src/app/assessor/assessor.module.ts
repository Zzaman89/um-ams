import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessorDefaultComponent } from './assessor-default/assessor-default.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AssessorDefaultComponent
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
