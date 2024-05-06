import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { IRegistration } from '../../../core/models/registration.model';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user: IRegistration = {
    username: '',
    email: '',
    password: ''
  }
  registerDisabled = false;

  constructor(
    public dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRegistration,
    private snackbarService: SnackbarService,
    private registerService: RegisterService
  ) {
    dialogRef.disableClose = true;
  }

  register(): void {
    this.registerDisabled = true;
    this.registerService.register(this.user).pipe(first()).subscribe(res => {
      this.registerDisabled = false;
      if (res.error) {
        this.snackbarService.openSnackBar(res.error);
        return;
      }

      this.snackbarService.openSnackBar(res.message);
      this.dialogRef.close();
    });
  }
}
