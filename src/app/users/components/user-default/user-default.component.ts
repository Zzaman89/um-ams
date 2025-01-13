import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { IUser } from '../../../core/models/user.model';
import { UserService } from '../../services/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-default',
  templateUrl: './user-default.component.html',
  styleUrl: './user-default.component.scss'
})
export class UserDefaultComponent implements OnInit {
  data: IUser[] = [];
  totalCount!: number;
  displayedColumns: string[] = ['Name', 'Email', 'Role', 'Actions'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  getUsers(limit: number = 10, skip: number = 0): void {
    this.userService.getUsers(limit, skip).pipe(first()).subscribe(res => {
      this.data = res.Data;
      this.totalCount = res.Total
    });
  }

  openUserCreateModal(): void {
    const ref = this.dialog.open(UserCreateComponent, {
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });


    ref.afterClosed().subscribe(_ => {
      this.getUsers();
    });
  }

  openUpdateUserModal(user: IUser): void {
    const ref = this.dialog.open(UserUpdateComponent, {
      data: user,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    ref.afterClosed().subscribe(_ => {
      this.getUsers();
    });
  }

  openDeleteUserModal(user: IUser): void {
    const ref = this.dialog.open(UserDeleteComponent, {
      data: user,
      width: '40vw',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    ref.afterClosed().subscribe(_ => {
      this.getUsers();
    });
  }

  onPageChange(pageConfig: any): void {
    const pageSize = pageConfig.pageSize;
    const skip = pageConfig.pageSize * pageConfig.pageIndex;
    this.getUsers(pageSize, skip);
  }

  ngOnInit(): void {
    this.getUsers();
  }

}