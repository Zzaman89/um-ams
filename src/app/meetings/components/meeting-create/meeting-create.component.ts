import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeetingService } from '../../services/meeting.service';
import { IMeeting } from '../../../core/models/meeting.model';
import { first } from 'rxjs';
import { UserService } from '../../../users/services/user.service';
import { IUser } from '../../../core/models/user.model';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrl: './meeting-create.component.scss'
})
export class MeetingCreateComponent implements OnInit {
  isLoading: boolean = false;
  users: Array<IUser> = [];
  today = new Date();

  meetingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    startingDate: new FormControl('', Validators.required),
    endingDate: new FormControl('', Validators.required),
    invitedUsers: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    meetingLink: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<MeetingCreateComponent>,
    private snackBar: MatSnackBar,
    private meetingService: MeetingService,
    private userService: UserService
  ) { }

  createMeeting(): void {
    this.isLoading = true;

    if (this.meetingForm.valid) {
      const data: IMeeting = {
        _id: '',
        Title: this.meetingForm.value['title'] as string,
        CreatedByUserId: '',
        CreatedByUserName: '',
        Description: this.meetingForm.value['description'] as string,
        StartingDate: this.meetingForm.value['startingDate'] as unknown as Date,
        EndingDate: this.meetingForm.value['endingDate'] as unknown as Date,
        InvitedUsers: (this.meetingForm.value['invitedUsers'] as unknown as any[]).map(x => { return { UserId: x._id, UserName: x.Name } }),
        MeetingLink: this.meetingForm.value['meetingLink'] as string
      };

      this.meetingService.createMeeting(data).pipe(first()).subscribe(res => {
        this.isLoading = false;

        if (!res.IsValid) {
          this.snackBar.open('Couldn\'t create meeting.', undefined, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }

        if (res.IsValid) {
          this.snackBar.open('Meeting created successfully', undefined, {
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
      this.users = res;
    });
  }
}