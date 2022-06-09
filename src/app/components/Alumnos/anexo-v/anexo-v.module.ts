import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { AnexoVRoutingModule } from './anexo-v-routing.module';
import { BuscarPorFechaComponent } from './buscar-por-fecha/buscar-por-fecha.component';
import { CalendarioAnexoVComponent } from './calendario-anexo-v/calendario-anexo-v.component';
import { InsertarAnexoVComponent } from './insertar-anexo-v/insertar-anexo-v.component';
import { ModificarAnexoVComponent } from './modificar-anexo-v/modificar-anexo-v.component';

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
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule, 
    MatPaginatorModule, 
    MatSelectModule,
    TextareaAutosizeModule 
  ],
  exports: [
    InsertarAnexoVComponent
  ]
})
export class AnexoVModule { }
