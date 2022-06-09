import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEmpresasComponent } from './listar-empresas/listar-empresas.component';
import { ModificarEmpresasComponent } from './modificar-empresas/modificar-empresas.component';

const routes: Routes = [
  { path: 'listar', component: ListarEmpresasComponent, pathMatch: 'full' },
  { path: 'modificarEmpresa/:id', component: ModificarEmpresasComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: '**', redirectTo: "error" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
