import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { InsertarAlumnosComponent } from './insertar-alumnos/insertar-alumnos.component';
import { ListarAlumnosPracticaComponent } from './listar-alumnos-practica/listar-alumnos-practica.component';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';


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
    MatPaginatorModule,
    MatIconModule
  ]
})
export class AlumnosModule { }
