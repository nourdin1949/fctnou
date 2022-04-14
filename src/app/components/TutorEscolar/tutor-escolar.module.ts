import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorEscolarComponent } from './tutor-escolar.component';
import { ChatEscoComponent } from './chat-esco/chat-esco.component';
import { AlumnoEscolarComponent } from './alumno-escolar/alumno-escolar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ListarAlumnosEscoComponent } from './alumno-escolar/listar-alumnos-esco/listar-alumnos-esco.component';
import { BuscarAlumnoEcoComponent } from './alumno-escolar/buscar-alumno-eco/buscar-alumno-eco.component';
import { ValidarTareaComponent } from './alumno-escolar/validar-tarea/validar-tarea.component';
@NgModule({
  declarations: [
    TutorEscolarComponent,
    ChatEscoComponent,
    AlumnoEscolarComponent,
    ListarAlumnosEscoComponent,
    BuscarAlumnoEcoComponent,
    ValidarTareaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class TutorEscolarModule { }
