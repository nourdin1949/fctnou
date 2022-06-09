import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';

const routes: Routes = [

  { path: 'listar', component: ListarCursosComponent },
  { path: 'modificarCurso/:id', component: ModificarCursosComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: '**', redirectTo: "error" },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
