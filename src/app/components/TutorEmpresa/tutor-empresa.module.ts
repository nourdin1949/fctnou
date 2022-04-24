import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorEmpresaComponent } from './tutor-empresa.component';
import { AlumnosEmpresaComponent } from './alumnos-empresa/alumnos-empresa.component';
import { ListarTodosComponent } from './alumnos-empresa/listar-todos/listar-todos.component';
import { ValidarComponent } from './alumnos-empresa/validar/validar.component';
import { BuscarAlumnoComponent } from './alumnos-empresa/buscar-alumno/buscar-alumno.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChatEmpComponent } from './chat-emp/chat-emp.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TutorEmpresaComponent,
    AlumnosEmpresaComponent,
    ListarTodosComponent,
    ValidarComponent,
    BuscarAlumnoComponent,
    ChatEmpComponent
  ],
  imports: [
    CommonModule, 
    AppRoutingModule, FormsModule
  ]
})
export class TutorEmpresaModule { }
