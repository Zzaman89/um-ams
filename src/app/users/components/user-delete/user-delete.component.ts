import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../../core/models/user.model';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})
export class UserDeleteComponent {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  deleteUser(): void {
    this.isLoading = true;

    this.userService.deleteUser(this.data._id).pipe(first()).subscribe(res => {
      this.isLoading = false;

      if (!res.IsValid) {
        this.snackBar.open('Couldn\'t update user.', undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }

      if (res.IsValid) {
        this.snackBar.open('User updated successfully', undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }

      this.dialogRef.close();
    });
  }
}
