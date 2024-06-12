import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-default',
  templateUrl: './faculty-default.component.html',
  styleUrl: './faculty-default.component.scss'
})
export class FacultyDefaultComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/faculty-dashboard/meetings']);
  }
}
