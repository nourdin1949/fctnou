import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsvRoutingModule } from './csv-routing.module';
import { InsertarDatosComponent } from './insertar-datos/insertar-datos.component';
import { AsignarComponent } from './asignar/asignar.component';
import { CsvComponent } from './csv.component';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InsertarDatosComponent,
    AsignarComponent,
    CsvComponent,
    AsignarRolesComponent
  ],
  imports: [
    CommonModule,
    CsvRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CsvModule { }
