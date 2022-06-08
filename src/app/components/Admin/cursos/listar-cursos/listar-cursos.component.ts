import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { windowWhen } from 'rxjs';
import { Alumno, Curso } from 'src/app/utils/interfaces/Interface';
import { AlumnosService } from '../../alumnos/alumnos.service';
import { CursosService } from '../cursos.service';
/**
 * The listar cursos component
 */
@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  /**
   * Matriz cursos
   */
  public cursos: Curso[] = []
  /**
   * Id curso
   */
  public idCurso: number = 0
  /**
   * Matriz Alumnos
   */
  public alumnos: Alumno[] = []
  /**
   * Carga completa
   */
  public cargaCompleta: boolean = false
  // Paginación campos
  /**
   * Cursos temporales en matriz
   */
  public cursosTmp: Curso[] = []
  /**
   * Total de cursos
   */
  public totalElements: number;
  /**
   * Pagina actual
   */
  @Input()
  public currentPage: number = 1;
  /**
   * Total de paginas
   */
  @Input()
  public totalPages: number = 0;
  /**
   * Numero de filas a mostrar en la tabla
   */
  @Input()
  public pageSize: number = 5;
  /**
   * Tamaños de página a elegir
   */
  public sizes: number[] = [5, 10, 15, 20];
  /**
   * Constructor
   * @param cursoServie 
   * @param _snackBar 
   * @param alumnosService 
   */
  public constructor(
    private cursoServie: CursosService,
    private _snackBar: MatSnackBar,
    private alumnosService: AlumnosService) {
    this.listarCursos()
  }
  /**
   * ngoninit
   */
  public ngOnInit(): void {
    this.alumnosMatriculados()
  }
  
  /**
   * Metodo listar cursos
   */
  public listarCursos() {
    this.cursoServie.listarCursos()
      .subscribe(
        (response) => {
          this.pageSize=5
          this.cursos = response;
          this.cargaCompleta = true
          this.totalElements = this.cursos.length
          this.totalPages = Math.ceil(this.totalElements / this.pageSize)
          this.cursosTmp = []
          for (let i = 0; i < this.pageSize * this.currentPage && this.cursos.length > i; i++) {
            this.cursosTmp[i] = this.cursos[i];
          }
        })
  }
  /**
   * Metodo guardar id
   * @param idCurso 
   */
  public guardarid(idCurso: number) {
    this.idCurso = idCurso
  }
  /**
   * Metodo eliminar curso
   */
  public eliminarCurso() {
    this.cursoServie.eliminarCurso(this.idCurso)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarCursos()
          this.firstPage()
        })
  }
  /**
   * Metodo listar alumnos Matriculados
   */
  public alumnosMatriculados() {
    this.alumnosService.listarAlumnos()
      .subscribe(
        (response) => {
          this.alumnos = response
        }
      )
  }
  /**
   * Metodo openSnackBar
   */
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
  }
  /**
  * Metodo dirige a la primera página
  * @returns 
  */
  public firstPage() {
    if (this.currentPage === 1) {
      return false;
    }

    this.currentPage = 1;
    let x = 0;
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.cursosTmp[x] = this.cursos[i]
      x++;
    }
    this.cursosTmp = this.cursosTmp.sort(function (a, b) { return a.id - b.id; });

    return true
  }
  /**
   * Método dirige a la siguiente pagina
   * @returns 
   */
  public nextPage() {
    if (this.currentPage >= this.totalPages) {
      return false;
    }
    this.currentPage++;

    this.cursosTmp = []

    let x = 0
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.cursos.length > i; i++) {
      this.cursosTmp[x] = this.cursos[i]
      x++;
    }

    return true
  }
  /**
     * Método dirige a la anteriro pagina
     * @returns 
     */
  public prevPage() {
    if (this.currentPage <= 1) {
      return false;
    }
    this.currentPage--;

    this.cursosTmp = []
    let x = 0
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.cursosTmp[x] = this.cursos[i]
      x++;
    }
    this.cursosTmp = this.cursosTmp.sort(function (a, b) { return a.id - b.id; });

    return true
  }
  /**
   * Método dirige a la ultima pagina
   * @returns 
   */
  public lastPage() {
    if (this.currentPage === this.totalPages) {
      return false;
    }
    this.currentPage = this.totalPages;

    this.cursosTmp = []
    let x = 0;
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.cursos.length > i; i++) {
      this.cursosTmp[x] = this.cursos[i]
      x++;
    }

    return true
  }
  /**
   * Cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.listarCursos()
  }
}
