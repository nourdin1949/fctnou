import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationAdminGuard } from './auth/authentication-admin.guard';
import { AuthenticationAlumnoGuard } from './auth/authentication-alumno.guard';
import { AuthenticationProfesorGuard } from './auth/authentication-profesor.guard';
import { AuthenticationResponsableGuard } from './auth/authentication-responsable.guard';
import { AuthenticationGuard } from './auth/authentication.guard'
import { AdminComponent } from './components/Admin/admin.component';
import { ProfesorComponent } from './components/Admin/profesor/profesor.component';
import { ResponsableComponent } from './components/Admin/responsable/responsable.component';
import { AlumnosComponent } from './components/Alumnos/alumnos.component';
import { ComponentsComponent } from './components/components.component';
import { AlumnosEmpresaComponent } from './components/TutorEmpresa/alumnos-empresa/alumnos-empresa.component';
import { ChatEmpComponent } from './components/TutorEmpresa/chat-emp/chat-emp.component';
import { TutorEmpresaComponent } from './components/TutorEmpresa/tutor-empresa.component';
import { AlumnoEscolarComponent } from './components/TutorEscolar/alumno-escolar/alumno-escolar.component';
import { ChatEscoComponent } from './components/TutorEscolar/chat-esco/chat-esco.component';
import { TutorEscolarComponent } from './components/TutorEscolar/tutor-escolar.component';
import { ForgotPasswordComponent } from './Shared/forgot-password/forgot-password.component';
import { LoginComponent } from './Shared/login/login.component';
import { PageNotFoundedComponent } from './Shared/page-not-founded/page-not-founded.component';
import { PerfilComponent } from './Shared/perfil/perfil.component';
import { ResetPasswordComponent } from './Shared/reset-password/reset-password.component';
import { SendVerificarEmailComponent } from './Shared/send-verificar-email/send-verificar-email.component';
import { VerificarEmailComponent } from './Shared/verificar-email/verificar-email.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '', component: ComponentsComponent, children: [

      { path: 'perfil', component: PerfilComponent, pathMatch: 'full' , canActivate:[AuthenticationGuard]},
      {
        path: 'admin', component: AdminComponent, children: [
          { path: '', loadChildren: () => import("./components/Admin/alumnos/alumnos.module").then(m => m.AlumnosModule) },
          { path: 'alumnos', loadChildren: () => import("./components/Admin/alumnos/alumnos.module").then(m => m.AlumnosModule) },
          { path: 'cursos', loadChildren: () => import("./components/Admin/cursos/cursos.module").then(m => m.CursosModule) },
          { path: 'empresas', loadChildren: () => import("./components/Admin/empresas/empresas.module").then(m => m.EmpresasModule) },
          { path: 'centros', loadChildren: () => import("./components/Admin/centros/centros.module").then(m => m.CentrosModule) },
          { path: 'responsables', loadChildren: () => import("./components/Admin/responsable/responsable.module").then(m => m.ResponsableModule) },
          { path: 'profesores', loadChildren: () => import("./components/Admin/profesor/profesor.module").then(m => m.ProfesorModule) },
          { path: 'listaAlumnos', component: AlumnosComponent, pathMatch: 'full' },
          { path: 'csv', loadChildren: () => import("./components/Admin/csv/csv.module").then(m => m.CsvModule) },
          { path: '**', redirectTo: "error" },
        ], canActivate:[AuthenticationGuard,AuthenticationAdminGuard]
      },
      {
        path: 'alumno', component: AlumnosComponent, children: [
          { path: '', loadChildren: () => import("./components/Alumnos/anexo-v/anexo-v.module").then(m => m.AnexoVModule) },
          { path: '**', redirectTo: "error" },
        ], canActivate:[AuthenticationGuard,AuthenticationAlumnoGuard]
      },
      {
        path: 'tutorescolar', component: TutorEscolarComponent, children: [
          { path: 'lista', component: AlumnoEscolarComponent },
          { path: 'chat', component: ChatEscoComponent },
          { path: "", redirectTo: 'lista', pathMatch: 'full' },
          { path: '**', redirectTo: "error" },
        ], canActivate:[AuthenticationGuard,AuthenticationProfesorGuard]
      },
      {
        path: 'tutorempresa', component: TutorEmpresaComponent, children: [
          { path: 'lista', component: AlumnosEmpresaComponent },
          { path: 'chat', component: ChatEmpComponent },
          { path: "", redirectTo: 'lista', pathMatch: 'full' },
          { path: '**', redirectTo: "error" },
        ], canActivate:[AuthenticationGuard,AuthenticationResponsableGuard]
      },
    ]
  },
  { path: 'reset-password/:token', component: ResetPasswordComponent, pathMatch:'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verificacion', component: VerificarEmailComponent },
  { path: 'send-email-verificacion', component: SendVerificarEmailComponent },
  { path: '**', redirectTo: "error" },

  { path: "error", component: PageNotFoundedComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
