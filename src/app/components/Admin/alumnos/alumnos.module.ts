import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';
import { InsertarAlumnosComponent } from './insertar-alumnos/insertar-alumnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarAlumnosPracticaComponent } from './listar-alumnos-practica/listar-alumnos-practica.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input'; 
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {  MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AlumnosComponent,
    ListarAlumnosComponent,
    ModificarAlumnosComponent,
    InsertarAlumnosComponent,
    ListarAlumnosPracticaComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class AlumnosModule { }
