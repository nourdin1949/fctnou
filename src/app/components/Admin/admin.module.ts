import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { CentrosComponent } from './centros/centros.component';

import { CursosModule } from './cursos/cursos.module';
import { EmpresasModule } from './empresas/empresas.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ResponsableModule } from './responsable/responsable.module';
import { ProfesorModule } from './profesor/profesor.module';


@NgModule({
  declarations: [
    AdminComponent,
    CentrosComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CursosModule,
    EmpresasModule,
    ResponsableModule, 
    ProfesorModule
  ]
})
export class AdminModule { }
