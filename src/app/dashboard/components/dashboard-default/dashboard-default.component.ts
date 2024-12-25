import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DashboardReportData, DashBoardStatistics, DashboardUserData } from '../../../core/models/dashboard-statistics.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrl: './dashboard-default.component.scss'
})
export class DashboardDefaultComponent implements OnInit {
  data!: DashBoardStatistics;

  userStatistics: any = [];
  reportStatistics: any = []

  constructor(private dashboardService: DashboardService) { }

  prepareUserChartData(data: Array<DashboardUserData>): void {
    this.userStatistics = data.map(x => {
      return {
        name: x._id,
        value: x.count
      };
    });
  }

  prepareReportChartData(data: Array<DashboardReportData>): void {
    var items = data.map(x => {
      return {
        name: x._id,
        value: x.count
      };
    });

    this.reportStatistics = [{
      name: `Reports`,
      series: [...items]
    }];
  }

  reportChartLabelFormatter(data: any): string {
    const date = new Date(data);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  ngOnInit(): void {
    this.dashboardService.getDashboardStatistics().pipe(first()).subscribe(res => {
      this.data = res;

      this.prepareUserChartData(this.data.userData);
      this.prepareReportChartData(this.data.reportData);
    });
  }
}
