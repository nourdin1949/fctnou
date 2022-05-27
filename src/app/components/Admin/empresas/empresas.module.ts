import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { ModificarEmpresasComponent } from './modificar-empresas/modificar-empresas.component';
import { ListarEmpresasComponent } from './listar-empresas/listar-empresas.component';
import { InsertarEmpresaComponent } from './insertar-empresa/insertar-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    EmpresasComponent,
    ModificarEmpresasComponent,
    ListarEmpresasComponent,
    InsertarEmpresaComponent,

  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],exports:[
    ModificarEmpresasComponent,
    ListarEmpresasComponent
  ]
})
export class EmpresasModule { }
