import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { ModificarAlumnosComponent } from './modificar-alumnos/modificar-alumnos.component';

const routes: Routes = [
  {path:'',redirectTo:'listar' },
  {path:'listar', component:ListarAlumnosComponent,pathMatch:'full'},
  {path:'modificarAlumno/:id', component:ModificarAlumnosComponent, pathMatch:'full'},
  {path:'insertar', component:ModificarAlumnosComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
