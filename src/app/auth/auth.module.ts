import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyFilterModule } from 'primeng/keyfilter';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register/register-user.component';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    KeyFilterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    PasswordModule
  ],
  exports: [
    LoginComponent,
    RegisterUserComponent
  ]
})
export class AuthModule { }
