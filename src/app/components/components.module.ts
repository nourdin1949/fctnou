import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { AdminModule } from './Admin/admin.module';
import { AlumnosModule } from './Alumnos/alumnos.module';
import { ComponentsComponent } from './components.component';
import { TutorEmpresaModule } from './TutorEmpresa/tutor-empresa.module';
import { TutorEscolarModule } from './TutorEscolar/tutor-escolar.module';



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
