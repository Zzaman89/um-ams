import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { IUser } from '../../../core/models/user.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent implements OnInit {
  isLoading: boolean = false;

  userForm = new FormGroup({
    name: new FormControl(this.data.Name, Validators.required),
    email: new FormControl(this.data.Email, [Validators.required, Validators.email]),
    role: new FormControl(this.data.Role, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  updateUser(): void {
    this.isLoading = true;

    this.userService.updateUser(
      this.data._id,
      this.userForm.value['name'] as string,
      this.userForm.value['email'] as string,
      this.userForm.value['role'] as string
    ).pipe(first()).subscribe(res => {
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

  ngOnInit(): void {
    console.log(this.data);
  }
}
