import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-default',
  templateUrl: './report-default.component.html',
  styleUrl: './report-default.component.scss'
})
export class ReportDefaultComponent {

  constructor(private router: Router) { }
}
