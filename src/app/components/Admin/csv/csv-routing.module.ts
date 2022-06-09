import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvComponent } from './csv.component';

const routes: Routes = [
  { path: 'csv', component: CsvComponent, pathMatch:'full' },
  { path: '**', redirectTo: "error" },
  { path: '', redirectTo: "csv" },
 
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CsvRoutingModule { }
