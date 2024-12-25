import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-default',
  templateUrl: './admin-default.component.html',
  styleUrl: './admin-default.component.scss'
})
export class AdminDefaultComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/admin-dashboard/dashboard']);
  }
}
