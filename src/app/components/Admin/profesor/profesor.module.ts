import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { ProfesorComponent } from './profesor.component';
import { ListarProfesorComponent } from './listar-profesor/listar-profesor.component';
import { InsertarProfesorComponent } from './insertar-profesor/insertar-profesor.component';
import { ModificarProfesorComponent } from './modificar-profesor/modificar-profesor.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs'; 
@NgModule({
  declarations: [
    ProfesorComponent,
    ListarProfesorComponent,
    InsertarProfesorComponent,
    ModificarProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule, 
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class ProfesorModule { }
