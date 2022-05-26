import { Component, OnInit } from '@angular/core';
import { UserClaims } from '../../../models/user-claims';
// @ts-ignore
import { User } from 'firebase/app';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  public user!: User;
  public claims!: UserClaims | null;

  constructor(
    private readonly auth: UserService,
  ) { }

  ngOnInit(): void {

    this.auth.claims.subscribe(
      claims => this.claims = claims
    );

    this.auth.currentUser.subscribe(
      user => this.user = user
    );

  }

}
