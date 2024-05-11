import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDefaultComponent } from './components/user-default/user-default.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material.module';
import { UserCreateComponent } from './components/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserDefaultComponent
  }
];


@NgModule({
  declarations: [
    UserDefaultComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
