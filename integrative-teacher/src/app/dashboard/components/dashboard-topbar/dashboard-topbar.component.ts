import { Component, OnInit } from '@angular/core';
import { AcademicPeriodsService } from '../../../core/services/academic-period.service';
import { AcademicPeriod } from '../../../models/academic-period';
// @ts-ignore
import { User } from 'firebase/app';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.scss']
})
export class DashboardTopbarComponent implements OnInit {

  public academicPeriod!: AcademicPeriod | null;
  public user!: User;

  constructor(
    private academicPeriodsService: AcademicPeriodsService,
    private readonly auth: UserService,
  ) { }

  ngOnInit(): void {
    this.academicPeriodsService.current().subscribe(
      periods => this.academicPeriod = periods[0]
    );
  }

  signOut(): void {
    this.auth.signOut(['/']).then();
  }

}
