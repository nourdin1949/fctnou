import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentrosRoutingModule } from './centros-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ModificarCentrosComponent } from './modificar-centros/modificar-centros.component';
import { ListarCentrosComponent } from './listar-centros/listar-centros.component';
import { InsertarCentroComponent } from './insertar-centro/insertar-centro.component';


@NgModule({
  declarations: [
    ModificarCentrosComponent,
    ListarCentrosComponent,
    InsertarCentroComponent
  ],
  imports: [
    CommonModule,
    CentrosRoutingModule,
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
export class CentrosModule { }
