import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { CentrosComponent } from './centros/centros.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { ProfesorComponent } from './profesor/profesor.component';

import { CursosModule } from './cursos/cursos.module';
import { EmpresasModule } from './empresas/empresas.module';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    AdminComponent,
    CentrosComponent,
    ResponsableComponent,
    ProfesorComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CursosModule,
    EmpresasModule
  ]
})
export class AdminModule { }
