import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCentrosComponent } from './listar-centros/listar-centros.component';
import { ModificarCentrosComponent } from './modificar-centros/modificar-centros.component';

const routes: Routes = [
  { path: "listar", component: ListarCentrosComponent },
  { path: "modificarCentro/:id", component: ModificarCentrosComponent },
  { path: "", redirectTo: "listar" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentrosRoutingModule { }
