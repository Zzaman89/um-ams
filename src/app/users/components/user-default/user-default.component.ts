import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { IUser } from '../../../core/models/user.model';
import { UserService } from '../../services/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-default',
  templateUrl: './user-default.component.html',
  styleUrl: './user-default.component.scss'
})
export class UserDefaultComponent implements OnInit {
  data: IUser[] = [];
  displayedColumns: string[] = ['Name', 'Email', 'Role'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  openUserCreateModal(): void {
    this.dialog.open(UserCreateComponent, {
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(res => {
      this.data = res;
    });
  }

}