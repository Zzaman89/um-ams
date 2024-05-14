import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsDefaultComponent } from './components/meetings-default/meetings-default.component';
import { MeetingCreateComponent } from './components/meeting-create/meeting-create.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: MeetingsDefaultComponent
  }
];

@NgModule({
  declarations: [
    MeetingsDefaultComponent,
    MeetingCreateComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class MeetingsModule { }
