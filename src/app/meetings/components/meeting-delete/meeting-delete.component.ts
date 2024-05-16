import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../../core/models/user.model';
import { MeetingService } from '../../services/meeting.service';
import { IMeeting } from '../../../core/models/meeting.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-meeting-delete',
  templateUrl: './meeting-delete.component.html',
  styleUrl: './meeting-delete.component.scss'
})
export class MeetingDeleteComponent {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMeeting,
    public dialogRef: MatDialogRef<MeetingDeleteComponent>,
    private meetingService: MeetingService,
    private snackBar: MatSnackBar
  ) { }

  deleteMeeting(): void {
    this.isLoading = true;

    this.meetingService.deleteMeeting(this.data._id).pipe(first()).subscribe(res => {
      this.isLoading = false;

      if (!res.IsValid) {
        this.snackBar.open('Couldn\'t delete meeting', undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }

      if (res.IsValid) {
        this.snackBar.open('Meeting deleted successfully', undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }

      this.dialogRef.close();
    });
  }
}
