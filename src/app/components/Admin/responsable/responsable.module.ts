import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';
import { ListarResponsableComponent } from './listar-responsable/listar-responsable.component';
import { ModificarResponsableComponent } from './modificar-responsable/modificar-responsable.component';
import { InsertarResponsableComponent } from './insertar-responsable/insertar-responsable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ResponsableComponent,
    ListarResponsableComponent,
    ModificarResponsableComponent,
    InsertarResponsableComponent
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule, 
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
export class ResponsableModule { }
