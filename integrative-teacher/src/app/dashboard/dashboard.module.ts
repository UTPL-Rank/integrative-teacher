import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardShellComponent } from './pages/dashboard-shell/dashboard-shell.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardTopbarComponent } from './components/dashboard-topbar/dashboard-topbar.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';

// Components
const COMPONENTS = [
  DashboardNavbarComponent,
  DashboardTopbarComponent,
  LoadingBarComponent,
  ];

// Pages
const PAGES = [
  DashboardShellComponent,
  DashboardHomeComponent,
];

@NgModule({
  declarations: [
    PAGES, COMPONENTS
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
