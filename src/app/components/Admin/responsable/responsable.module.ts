import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';
import { ListarResponsableComponent } from './listar-responsable/listar-responsable.component';
import { ModificarResponsableComponent } from './modificar-responsable/modificar-responsable.component';
import { InsertarResponsableComponent } from './insertar-responsable/insertar-responsable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ResponsableComponent,
    ListarResponsableComponent,
    ModificarResponsableComponent,
    InsertarResponsableComponent
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class ResponsableModule { }
