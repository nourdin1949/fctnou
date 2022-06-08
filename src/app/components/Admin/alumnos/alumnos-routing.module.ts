import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';

const routes: Routes = [
  {path:'listar', component:ListarAlumnosComponent,pathMatch:'full'},
  {path:'modificarAlumno/:id', component:ModificarAlumnosComponent},
  {path:'',redirectTo:'listar' },
  { path: '**', redirectTo: "error" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
