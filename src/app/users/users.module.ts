import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDefaultComponent } from './components/user-default/user-default.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material.module';

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
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
