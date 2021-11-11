import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardShellComponent } from './pages/dashboard-shell/dashboard-shell.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';


const routes: Routes = [
  { path: '',
    component: DashboardShellComponent,
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }

  // { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
