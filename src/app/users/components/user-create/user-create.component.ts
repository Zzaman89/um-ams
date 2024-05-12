import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  isLoading: boolean = false;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  createUser(): void {
    this.isLoading = true;

    if (this.userForm.valid) {
      this.userService.createuser(
        this.userForm.value['name'] as string,
        this.userForm.value['email'] as string,
        this.userForm.value['password'] as string,
        this.userForm.value['role'] as string).pipe(first()).subscribe(res => {
          this.isLoading = false;

          if (!res.IsValid) {
            this.snackBar.open('Couldn\'t create user.', undefined, {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }

          if (res.IsValid) {
            this.snackBar.open('User created successfully', undefined, {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }

          this.dialogRef.close();
        });
    }
  }
}
