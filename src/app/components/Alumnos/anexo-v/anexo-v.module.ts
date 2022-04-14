import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexoVRoutingModule } from './anexo-v-routing.module';
import { InsertarAnexoVComponent } from './insertar-anexo-v/insertar-anexo-v.component';
import { CalendarioAnexoVComponent } from './calendario-anexo-v/calendario-anexo-v.component';
import { ModificarAnexoVComponent } from './modificar-anexo-v/modificar-anexo-v.component';


@NgModule({
  declarations: [
    InsertarAnexoVComponent,
    CalendarioAnexoVComponent,
    ModificarAnexoVComponent
  ],
  imports: [
    CommonModule,
    AnexoVRoutingModule
  ],
  exports: [
    InsertarAnexoVComponent
  ]
})
export class AnexoVModule { }
