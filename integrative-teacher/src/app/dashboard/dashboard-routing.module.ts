import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardShellComponent } from './pages/dashboard-shell/dashboard-shell.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';


const routes: Routes = [
  { path: '',
    component: DashboardShellComponent,
    children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'documents', loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsModule) },
      { path: 'planning', loadChildren: () => import('../planning/planning.module').then(m => m.PlanningModule) },
      { path: 'activities', loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesModule) },
      { path: 'analytics', loadChildren: () => import('../analytics/analytics.module').then(m => m.AnalyticsModule) },
      { path: 'upload', loadChildren: () => import('../upload/upload.module').then(m => m.UploadModule) },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ],

  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
