import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { ModificarEmpresasComponent } from './modificar-empresas/modificar-empresas.component';
import { ListarEmpresasComponent } from './listar-empresas/listar-empresas.component';
import { InsertarEmpresaComponent } from './insertar-empresa/insertar-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    ModificarEmpresasComponent,
    ListarEmpresasComponent
  ]
})
export class EmpresasModule { }
