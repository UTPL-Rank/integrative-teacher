import { Component, OnInit } from '@angular/core';
import { AcademicPeriodsService } from '../../../core/services/academic-period.service';
import { AcademicPeriod } from '../../../models/academic-period';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.scss']
})
export class DashboardTopbarComponent implements OnInit {

  public academicPeriod!: AcademicPeriod | null;
  public academicPeriodsList!: Array<AcademicPeriod>;

  constructor(
    private academicPeriodsService: AcademicPeriodsService
  ) { }

  ngOnInit(): void {
    this.academicPeriodsService.current().subscribe(
      periods => this.academicPeriod = periods[0]
    );
  }

}
