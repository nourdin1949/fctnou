import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { CursosComponent } from './cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';
import { InsertarCursoComponent } from './insertar-curso/insertar-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ListarCursosComponent,
    CursosComponent,
    ModificarCursosComponent,
    InsertarCursoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  exports:[
    CursosComponent,
    ModificarCursosComponent
  ]
})
export class CursosModule { }
