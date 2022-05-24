import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsvRoutingModule } from './csv-routing.module';
import { InsertarDatosComponent } from './insertar-datos/insertar-datos.component';
import { AsignarComponent } from './asignar/asignar.component';
import { CsvComponent } from './csv.component';
import { AsignarRolesComponent } from './asignar-roles/asignar-roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';


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
    FormsModule,
    MatTabsModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    NgxMatFileInputModule
  ]
})
export class CsvModule { }
