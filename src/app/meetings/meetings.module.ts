import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AvatarModule } from 'ngx-avatars';
import { MaterialModule } from '../shared/material.module';
import { MeetingCreateComponent } from './components/meeting-create/meeting-create.component';
import { MeetingDetailsComponent } from './components/meeting-details/meeting-details.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { MeetingsDefaultComponent } from './components/meetings-default/meetings-default.component';
import { MeetingEditComponent } from './components/meeting-edit/meeting-edit.component';

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
    MeetingListComponent,
    MeetingDetailsComponent,
    MeetingEditComponent
  ],
  imports: [
    AvatarModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MeetingsModule { }
