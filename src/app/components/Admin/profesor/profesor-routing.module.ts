import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProfesorComponent } from './listar-profesor/listar-profesor.component';
import { ModificarProfesorComponent } from './modificar-profesor/modificar-profesor.component';

const routes: Routes = [{ path: '', redirectTo: "listar" ,pathMatch:'full'}, 
{ path:'listar', component:ListarProfesorComponent},
{ path:'modificarProfesor/:id', component:ModificarProfesorComponent},
{ path: '**', redirectTo: "error" },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
