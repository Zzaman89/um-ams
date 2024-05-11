import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs';
import { IUser } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-default',
  templateUrl: './user-default.component.html',
  styleUrl: './user-default.component.scss'
})
export class UserDefaultComponent implements OnInit {
  data: IUser[] = [];
  displayedColumns: string[] = ['Name', 'Email', 'Role'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(res => {
      this.data = res;
    });
  }

}