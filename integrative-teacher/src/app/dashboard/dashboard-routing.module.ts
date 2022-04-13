import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardShellComponent } from './pages/dashboard-shell/dashboard-shell.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { SignedInGuard } from '../core/guards/signed-in.guard';
import { IsTeacherGuard } from '../core/guards/is-teacher.guard';
import { IsAdminGuard } from '../core/guards/is-admin.guard';


const routes: Routes = [
  { path: '',
    component: DashboardShellComponent,
    canActivate: [SignedInGuard],
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent,
      },
      {
        path: 'documents',
        loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsModule),
        canActivate: [IsTeacherGuard]
      },
      {
        path: 'planning',
        loadChildren: () => import('../planning/planning.module').then(m => m.PlanningModule),
        canActivate: [IsTeacherGuard]
      },
      {
        path: 'activities',
        loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesModule),
        canActivate: [IsTeacherGuard]
      },
      {
        path: 'analytics',
        loadChildren: () => import('../analytics/analytics.module').then(m => m.AnalyticsModule),
        canActivate: [IsAdminGuard]
      },
      {
        path: 'upload',
        loadChildren: () => import('../upload/upload.module').then(m => m.UploadModule),
        canActivate: [IsAdminGuard]
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ],

  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
