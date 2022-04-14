import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './Sidebar/sidebar.component';
import { PageNotFoundedComponent } from './page-not-founded/page-not-founded.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';




@NgModule({
  declarations: [
    SidebarComponent,
    PageNotFoundedComponent,
    LoginComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ReactiveFormsModule,
  FormsModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class SharedModule { }
