import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorEmpresaComponent } from './tutor-empresa.component';
import { AlumnosEmpresaComponent } from './alumnos-empresa/alumnos-empresa.component';
import { ListarTodosComponent } from './alumnos-empresa/listar-todos/listar-todos.component';
import { ValidarComponent } from './alumnos-empresa/validar/validar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChatEmpComponent } from './chat-emp/chat-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    TutorEmpresaComponent,
    AlumnosEmpresaComponent,
    ListarTodosComponent,
    ValidarComponent,
    ChatEmpComponent
  ],
  imports: [
    CommonModule, 
    AppRoutingModule, 
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTabsModule, 
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule, 
    MatIconModule
  ]
})
export class TutorEmpresaModule { }
