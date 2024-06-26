import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDefaultComponent } from './components/user-default/user-default.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material.module';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';

const routes: Routes = [
  {
    path: '',
    component: UserDefaultComponent
  }
];


@NgModule({
  declarations: [
    UserDefaultComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
