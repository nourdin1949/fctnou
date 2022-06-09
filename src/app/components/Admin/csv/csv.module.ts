import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { AsignarComponent } from './asignar/asignar.component';
import { CsvRoutingModule } from './csv-routing.module';
import { CsvComponent } from './csv.component';
import { InsertarDatosComponent } from './insertar-datos/insertar-datos.component';



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
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MaterialFileInputModule,
    MatTooltipModule
  ]
})
export class CsvModule { }
