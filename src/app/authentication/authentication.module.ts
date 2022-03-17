import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TokenPasswordChangeComponent } from './password-reset/token-password-change/token-password-change.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    TokenPasswordChangeComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PanelModule,
    MessagesModule,
  ],
})
export class AuthenticationModule {}
