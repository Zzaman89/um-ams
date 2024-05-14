import { Component } from '@angular/core';

@Component({
  selector: 'app-meetings-default',
  templateUrl: './meetings-default.component.html',
  styleUrl: './meetings-default.component.scss'
})
export class MeetingsDefaultComponent {
  constructor() { }
  openMeetingCreateModal(): void { }
}
