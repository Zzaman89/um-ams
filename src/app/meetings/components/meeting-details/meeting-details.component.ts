import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMeeting } from '../../../core/models/meeting.model';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrl: './meeting-details.component.scss'
})
export class MeetingDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMeeting,
    public dialogRef: MatDialogRef<MeetingDetailsComponent>
  ) { }
}
