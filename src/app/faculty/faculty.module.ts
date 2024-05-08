import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDefaultComponent } from './faculty-default/faculty-default.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FacultyDefaultComponent
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
