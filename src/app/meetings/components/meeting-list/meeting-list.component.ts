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

  constructor(private meetingService: MeetingService) { }

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

  handleEvent(action: string, event: CalendarEvent): void { }

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
            title: x.Title
          }
        });
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