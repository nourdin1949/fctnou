import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexoVRoutingModule } from './anexo-v-routing.module';
import { InsertarAnexoVComponent } from './insertar-anexo-v/insertar-anexo-v.component';
import { CalendarioAnexoVComponent } from './calendario-anexo-v/calendario-anexo-v.component';
import { ModificarAnexoVComponent } from './modificar-anexo-v/modificar-anexo-v.component';
import { BuscarPorFechaComponent } from './buscar-por-fecha/buscar-por-fecha.component';
import { FormsModule } from '@angular/forms';
import {FullCalendarModule} from 'primeng/fullcalendar'
import { MatTabsModule } from '@angular/material/tabs';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    FullCalendarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    InsertarAnexoVComponent
  ]
})
export class AnexoVModule { }
