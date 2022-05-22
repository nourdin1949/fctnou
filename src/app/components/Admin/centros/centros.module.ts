import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentrosRoutingModule } from './centros-routing.module';
import { ModificarCentrosComponent } from './modificar-centros/modificar-centros.component';
import { ListarCentrosComponent } from './listar-centros/listar-centros.component';
import { InsertarCentroComponent } from './insertar-centro/insertar-centro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ModificarCentrosComponent,
    ListarCentrosComponent,
    InsertarCentroComponent
  ],
  imports: [
    CommonModule,
    CentrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class CentrosModule { }
