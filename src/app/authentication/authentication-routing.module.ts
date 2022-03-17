import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TokenPasswordChangeComponent } from './password-reset/token-password-change/token-password-change.component';
import { LogoutComponent } from './logout/logout.component';
import { NonAuthedUserGuard } from '../guards/non-authed-user.guard';
import { AuthedUserGuard } from '../guards/authed-user.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthedUserGuard],
    canActivateChild: [NonAuthedUserGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthedUserGuard],
    canActivateChild: [AuthedUserGuard],
  },
  {
    path: 'password-reset/:id',
    component: TokenPasswordChangeComponent,
    canActivate: [NonAuthedUserGuard],
    canActivateChild: [NonAuthedUserGuard],
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [NonAuthedUserGuard],
    canActivateChild: [NonAuthedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
