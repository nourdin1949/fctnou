import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AnexoVComponent } from './anexo-v/anexo-v.component';
import { AnexoVModule } from './anexo-v/anexo-v.module';


@NgModule({
  declarations: [
    AlumnosComponent,
    AnexoVComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AnexoVModule
  ]
})
export class AlumnosModule { }
