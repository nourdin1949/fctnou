import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarResponsableComponent } from './listar-responsable/listar-responsable.component';
import { ModificarResponsableComponent } from './modificar-responsable/modificar-responsable.component';

const routes: Routes = [
  { path: '', redirectTo: "listar" ,pathMatch:'full'}, 
  { path:'listar', component:ListarResponsableComponent},
  { path:'modificarResponsable/:id', component:ModificarResponsableComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableRoutingModule { }
