import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AlumnosEmpresaComponent } from './alumnos-empresa/alumnos-empresa.component';
import { ListarTodosComponent } from './alumnos-empresa/listar-todos/listar-todos.component';
import { ValidarComponent } from './alumnos-empresa/validar/validar.component';
import { ChatEmpComponent } from './chat-emp/chat-emp.component';
import { TutorEmpresaComponent } from './tutor-empresa.component';


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
    MatIconModule,
    TextareaAutosizeModule
  ]
})
export class TutorEmpresaModule { }
