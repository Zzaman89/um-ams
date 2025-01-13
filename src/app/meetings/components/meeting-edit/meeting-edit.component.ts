import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMeeting } from '../../../core/models/meeting.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { UserService } from '../../../users/services/user.service';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrl: './meeting-edit.component.scss'
})
export class MeetingEditComponent implements OnInit {
  isLoading: boolean = false;
  users: Array<IUser> = [];
  today = new Date();

  meetingForm = new FormGroup({
    title: new FormControl(this.data.Title, Validators.required),
    startingDate: new FormControl(this.data.StartingDate, Validators.required),
    endingDate: new FormControl(this.data.EndingDate, Validators.required),
    invitedUsers: new FormControl('', Validators.required), // TO-DO: Map selected user to mat-select
    description: new FormControl(this.data.Description, Validators.required),
    meetingLink: new FormControl(this.data.MeetingLink, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMeeting,
    public dialogRef: MatDialogRef<MeetingEditComponent>,
    private snackBar: MatSnackBar,
    private meetingService: MeetingService,
    private userService: UserService
  ) { }

  updateMeeting(): void {
    this.isLoading = true;

    if (this.meetingForm.valid) {
      const data: IMeeting = {
        _id: this.data._id,
        Title: this.meetingForm.value['title'] as string,
        CreatedByUserId: '',
        CreatedByUserName: '',
        Description: this.meetingForm.value['description'] as string,
        StartingDate: this.meetingForm.value['startingDate'] as unknown as Date,
        EndingDate: this.meetingForm.value['endingDate'] as unknown as Date,
        InvitedUsers: (this.meetingForm.value['invitedUsers'] as unknown as any[]).map(x => { return { UserId: x._id, UserName: x.Name } }),
        MeetingLink: this.meetingForm.value['meetingLink'] as string
      };

      this.meetingService.updateMeeting(data).pipe(first()).subscribe(res => {
        this.isLoading = false;

        if (!res.IsValid) {
          this.snackBar.open('Couldn\'t update meeting.', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }

        if (res.IsValid) {
          this.snackBar.open('Meeting updated successfully', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }

        this.dialogRef.close();
      });
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(res => {
      this.users = res.Data;
    });
  }
}
