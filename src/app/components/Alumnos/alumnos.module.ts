import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { AppRoutingModule } from '../../app-routing.module';
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
