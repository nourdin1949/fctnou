import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexoVRoutingModule } from './anexo-v-routing.module';
import { InsertarAnexoVComponent } from './insertar-anexo-v/insertar-anexo-v.component';
import { CalendarioAnexoVComponent } from './calendario-anexo-v/calendario-anexo-v.component';
import { ModificarAnexoVComponent } from './modificar-anexo-v/modificar-anexo-v.component';
import { BuscarPorFechaComponent } from './buscar-por-fecha/buscar-por-fecha.component';
import { FormsModule } from '@angular/forms';
import {FullCalendarModule} from 'primeng/fullcalendar'

@NgModule({
  declarations: [
    InsertarAnexoVComponent,
    CalendarioAnexoVComponent,
    ModificarAnexoVComponent,
    BuscarPorFechaComponent
  ],
  imports: [
    CommonModule,
    AnexoVRoutingModule, 
    FormsModule,
    FullCalendarModule
  ],
  exports: [
    InsertarAnexoVComponent
  ]
})
export class AnexoVModule { }
