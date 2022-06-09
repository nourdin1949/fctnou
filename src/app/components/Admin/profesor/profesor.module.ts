import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { InsertarProfesorComponent } from './insertar-profesor/insertar-profesor.component';
import { ListarProfesorComponent } from './listar-profesor/listar-profesor.component';
import { ModificarProfesorComponent } from './modificar-profesor/modificar-profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { ProfesorComponent } from './profesor.component';


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
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class ProfesorModule { }
