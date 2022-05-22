import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { CursosComponent } from './cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';
import { InsertarCursoComponent } from './insertar-curso/insertar-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';


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
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule
  ],
  exports:[
    CursosComponent,
    ModificarCursosComponent
  ]
})
export class CursosModule { }
