import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  url = 'https://docs.google.com/file/d/1P1J0CkAxTnmYzF2X1TAeBEafK50UYLyJ/preview';

  constructor() { }

  ngOnInit(): void {
  }

}
