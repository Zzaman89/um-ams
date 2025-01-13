import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { INotification } from '../../../core/models/notification.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrl: './notification-bar.component.scss'
})
export class NotificationBarComponent implements OnInit {
  data!: Array<INotification>;

  constructor(private notificationService: NotificationService) { }

  getNotification(): void {
    this.notificationService.getNotifications().pipe(first()).subscribe(res => {
      this.data = res;
    });
  }

  timeAgo(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  }

  ngOnInit(): void {
    this.getNotification();
  }
}
