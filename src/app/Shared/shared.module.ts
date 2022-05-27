import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './Sidebar/sidebar.component';
import { PageNotFoundedComponent } from './page-not-founded/page-not-founded.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from "@angular/common/http";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SidebarComponent,
    PageNotFoundedComponent,
    LoginComponent,
    PerfilComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerificarEmailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    MatIconModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
