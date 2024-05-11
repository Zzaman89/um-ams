import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDefaultComponent } from './user-default/user-default.component';

const routes: Routes = [
  {
    path: '',
    component: UserDefaultComponent
  }
];


@NgModule({
  declarations: [
    UserDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
