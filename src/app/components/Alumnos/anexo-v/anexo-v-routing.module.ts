import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioAnexoVComponent } from './calendario-anexo-v/calendario-anexo-v.component';
import { InsertarAnexoVComponent } from './insertar-anexo-v/insertar-anexo-v.component';
import { ModificarAnexoVComponent } from './modificar-anexo-v/modificar-anexo-v.component';

const routes: Routes = [

  { path: 'calendario', component: CalendarioAnexoVComponent },
  { path: '', redirectTo: "calendario" , pathMatch:'full'},
  { path: 'insertar/:fecha', component: InsertarAnexoVComponent , pathMatch:'full'},
  { path: 'insertar', component: InsertarAnexoVComponent , pathMatch:'full'},
  { path: 'modificar/:fecha', component: ModificarAnexoVComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnexoVRoutingModule { }
