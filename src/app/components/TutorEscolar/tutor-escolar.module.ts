import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorEscolarComponent } from './tutor-escolar.component';
import { ChatEscoComponent } from './chat-esco/chat-esco.component';
import { AlumnoEscolarComponent } from './alumno-escolar/alumno-escolar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ListarAlumnosEscoComponent } from './alumno-escolar/listar-alumnos-esco/listar-alumnos-esco.component';
import { BuscarAlumnoEcoComponent } from './alumno-escolar/buscar-alumno-eco/buscar-alumno-eco.component';
import { ValidarTareaComponent } from './alumno-escolar/validar-tarea/validar-tarea.component';
import {  MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
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
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class TutorEscolarModule { }
