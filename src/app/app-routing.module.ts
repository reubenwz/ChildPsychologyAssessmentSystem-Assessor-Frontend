import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthedUserGuard } from './guards/authed-user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [AuthedUserGuard],
    canActivateChild: [AuthedUserGuard],
    loadChildren: () =>
      import('./assessor-dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./main-redirector/main-redirector.module').then(
        (m) => m.MainRedirectorModule
      ),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
