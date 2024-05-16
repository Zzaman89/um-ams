import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, first } from 'rxjs';
import { MeetingService, Months } from '../../services/meeting.service';
import { MatDialog } from '@angular/material/dialog';
import { MeetingDetailsComponent } from '../meeting-details/meeting-details.component';
import { IMeeting } from '../../../core/models/meeting.model';
import { MeetingEditComponent } from '../meeting-edit/meeting-edit.component';
import { MeetingDeleteComponent } from '../meeting-delete/meeting-delete.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.scss'
})
export class MeetingListComponent implements OnInit, OnChanges {
  @Input() refreshMeeting: boolean = false;

  refresh = new Subject<void>();
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  actions: CalendarEventAction[] = [
    {
      label: 'Edit',
      a11yLabel: 'Edit',
      cssClass: 'action-red',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edit', event);
      },
    },
    {
      label: 'Delete',
      a11yLabel: 'Delete',
      cssClass: 'action-blue',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Delete', event);
      },
    },
  ];

  constructor(
    private meetingService: MeetingService,
    public dialog: MatDialog
  ) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    switch (action) {
      case 'Clicked':
        this.openMeetingDetailsModal(event.meta);
        return;
      case 'Edit':
        this.openMeetingEditModal(event.meta);
        return;
      case 'Delete':
        this.openMeetingDeleteModal(event.meta);
        return;
      default:
        console.log("Action doesn't exist");
    }
  }

  addEvent(): void { }

  deleteEvent(eventToDelete: CalendarEvent) { }

  closeOpenMonthViewDay() {
    this.getMeetings(this.viewDate.getFullYear(), this.viewDate.getMonth());
    this.activeDayIsOpen = false;
  }

  getMeetings(year: number = this.viewDate.getFullYear(), month: Months = this.viewDate.getMonth()): void {
    this.meetingService.getMeetings(year, month)
      .pipe(first()).subscribe(res => {
        this.events = res.Data.map(x => {
          return {
            start: new Date(x.StartingDate),
            end: new Date(x.EndingDate),
            title: x.Title,
            meta: x,
            actions: this.actions
          }
        });

        this.refresh.next();
      });
  }

  openMeetingDetailsModal(data: IMeeting): void {
    this.dialog.open(MeetingDetailsComponent, {
      data: data,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  openMeetingEditModal(data: IMeeting): void {
    this.dialog.open(MeetingEditComponent, {
      data: data,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  openMeetingDeleteModal(data: IMeeting): void {
    this.dialog.open(MeetingDeleteComponent, {
      data: data,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshMeeting'].currentValue) {
      this.getMeetings();
    }
  }

  ngOnInit(): void {
    this.getMeetings();
  }
}