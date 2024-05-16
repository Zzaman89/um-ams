import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingCreateComponent } from '../meeting-create/meeting-create.component';

@Component({
  selector: 'app-meetings-default',
  templateUrl: './meetings-default.component.html',
  styleUrl: './meetings-default.component.scss'
})
export class MeetingsDefaultComponent {
  refresh: boolean = false;

  constructor(
    public dialog: MatDialog
  ) { }

  openMeetingCreateModal(): void {
    const ref = this.dialog.open(MeetingCreateComponent, {
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });


    ref.afterClosed().subscribe(_ => {
      this.refresh = true;

      setTimeout(() => {
        this.refresh = false;
      }, 2000);
    });
  }
}
