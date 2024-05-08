import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDefaultComponent } from './admin-default/admin-default.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminDefaultComponent
  }
];

@NgModule({
  declarations: [
    AdminDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
