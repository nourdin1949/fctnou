import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { InsertarCursoComponent } from './insertar-curso/insertar-curso.component';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';

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
  exports: [
    CursosComponent,
    ModificarCursosComponent
  ]
})
export class CursosModule { }
