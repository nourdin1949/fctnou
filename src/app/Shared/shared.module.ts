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
import { MatInputModule } from '@angular/material/input';
import { SendVerificarEmailComponent } from './send-verificar-email/send-verificar-email.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    SidebarComponent,
    PageNotFoundedComponent,
    LoginComponent,
    PerfilComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerificarEmailComponent,
    SendVerificarEmailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MaterialFileInputModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
