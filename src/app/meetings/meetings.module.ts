import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { MeetingCreateComponent } from './components/meeting-create/meeting-create.component';
import { MeetingsDefaultComponent } from './components/meetings-default/meetings-default.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingsDefaultComponent
  }
];

@NgModule({
  declarations: [
    MeetingsDefaultComponent,
    MeetingCreateComponent,
    MeetingListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MeetingsModule { }
