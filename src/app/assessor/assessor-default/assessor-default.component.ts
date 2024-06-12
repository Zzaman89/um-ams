import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessor-default',
  templateUrl: './assessor-default.component.html',
  styleUrl: './assessor-default.component.scss'
})
export class AssessorDefaultComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/assessor-dashboard/meetings']);
  }
}
