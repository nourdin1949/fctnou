import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsComponent } from './components.component';
import { AdminModule } from './Admin/admin.module';
import { AlumnosModule } from './Alumnos/alumnos.module';
import { SharedModule } from '../Shared/shared.module';
import { TutorEmpresaModule } from './TutorEmpresa/tutor-empresa.module';
import { TutorEscolarModule } from './TutorEscolar/tutor-escolar.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AdminModule,
    AlumnosModule,
    SharedModule,
    TutorEmpresaModule,
    TutorEscolarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  exports:[
    ComponentsComponent,
    MatSnackBarModule
  ]
})
export class ComponentsModule { }
