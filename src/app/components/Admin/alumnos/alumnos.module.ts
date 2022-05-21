import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';
import { InsertarAlumnosComponent } from './insertar-alumnos/insertar-alumnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarAlumnosPracticaComponent } from './listar-alumnos-practica/listar-alumnos-practica.component';
import { ModificarAlumnosPracticaComponent } from './modificar-alumnos-practica/modificar-alumnos-practica.component';


@NgModule({
  declarations: [
    AlumnosComponent,
    ListarAlumnosComponent,
    ModificarAlumnosComponent,
    InsertarAlumnosComponent,
    ListarAlumnosPracticaComponent,
    ModificarAlumnosPracticaComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AlumnosModule { }
