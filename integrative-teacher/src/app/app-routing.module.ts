import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./sign-in/sign-in.module').then(l => l.SignInModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'legacy'
    })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
