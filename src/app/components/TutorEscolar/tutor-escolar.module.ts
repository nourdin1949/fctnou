import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AlumnoEscolarComponent } from './alumno-escolar/alumno-escolar.component';
import { ListarAlumnosEscoComponent } from './alumno-escolar/listar-alumnos-esco/listar-alumnos-esco.component';
import { ValidarTareaComponent } from './alumno-escolar/validar-tarea/validar-tarea.component';
import { ChatEscoComponent } from './chat-esco/chat-esco.component';
import { TutorEscolarComponent } from './tutor-escolar.component';
@NgModule({
  declarations: [
    TutorEscolarComponent,
    ChatEscoComponent,
    AlumnoEscolarComponent,
    ListarAlumnosEscoComponent,
    ValidarTareaComponent
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
    ReactiveFormsModule,
    MatIconModule, 
    TextareaAutosizeModule
  ]
})
export class TutorEscolarModule { }
