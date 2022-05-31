import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno, Curso } from 'src/app/Shared/interfaces/Interface';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  public cursos: Curso[] = []
  public idCurso: number = 0
  public alumnos:Alumno[]=[]
  public cargaCompleta: boolean = false
  public constructor(
    private cursoServie: CursosService,
    private _snackBar: MatSnackBar, 
    private alumnosService:AlumnosService) {
    this.listarCursos()
  }

  public ngOnInit(): void {
    this.alumnosMatriculados()
  }

  public listarCursos() {
    this.cursoServie.listarCursos()
      .subscribe(
        (response) => {
          this.cursos = response;
          this.cargaCompleta = true
        })
  }
  public guardarid(idCurso: number) {
    this.idCurso = idCurso
  }
  public eliminarCurso() {
    this.cursoServie.eliminarCurso(this.idCurso)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarCursos()
        })
  }
  public alumnosMatriculados(){
    this.alumnosService.listarAlumnos()
      .subscribe(
        (response)=>{
          this.alumnos= response
        }
      )
  }
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
  }
}
