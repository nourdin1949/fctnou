import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno, Empresa } from 'src/app/utils/interfaces/Interface';
import { AlumnosService } from '../alumnos.service';

/**
 * The listar alumnos component
 */
@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class ListarAlumnosComponent implements OnInit {
  /**
   * Matriz empresa
   */
  public empresas: Empresa[] = []
  /**
   * Matriz alumnos
   */
  public alumnos: Alumno[] = []
  /**
   * Matriz alumnos fct
   */
  public alumnosfct: Alumno[] = []
  /**
   * Carga completa
   */
  public cargaCompleta: boolean = false
  /**
   * ID 
   */
  public id: number = 0
  // Paginación campos
  /**
   * Alumnos temporales en matriz
   */
  public alumnosTmp: Alumno[] = []
  /**
   * Total de alumnos
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
   * @param alumnoservice 
   * @param _snackBar 
   */
  constructor(
    private alumnoservice: AlumnosService,
    private _snackBar: MatSnackBar) {}
  /**
   * NGOnInit
   */
  ngOnInit(): void {
    this.listarAlumnos()
  }
  /**
   * Metodo listar alumnos
   */
  listarAlumnos() {
    this.alumnoservice.listarAlumnos()
      .subscribe(
        (response) => {
          this.alumnos = response
          this.cargaCompleta = true
          this.totalElements = this.alumnos.length
          this.totalPages = Math.ceil(this.totalElements / this.pageSize)
          this.alumnosTmp = []
          for (let i = 0; i < this.pageSize * this.currentPage && this.alumnos.length > i; i++) {
            this.alumnosTmp[i] = this.alumnos[i];
          }
        })
  }
  /**
   * Metodo elimina ralumno
   * @param idAlumno 
   */
  public eliminarAlumno(idAlumno: number) {
    this.alumnoservice.eliminarAlumno(idAlumno)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarAlumnos()
          this.firstPage()
        })
  }
  /**
   * Metodo guardar id alumno
   * @param idAlumno 
   */
  public guardarid(idAlumno: number) {
    this.id = idAlumno
  }
  /**
   * metodo open snack bar al eliminar
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
      this.alumnosTmp[x] = this.alumnos[i]
      x++;
    }
    this.alumnosTmp = this.alumnosTmp.sort(function (a, b) { return a.id - b.id; });

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

    this.alumnosTmp = []

    let x = 0
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.alumnos.length > i; i++) {
      this.alumnosTmp[x] = this.alumnos[i]
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

    this.alumnosTmp = []
    let x = 0
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.alumnosTmp[x] = this.alumnos[i]
      x++;
    }
    this.alumnosTmp = this.alumnosTmp.sort(function (a, b) { return a.id - b.id; });

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

    this.alumnosTmp = []
    let x = 0;
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.alumnos.length > i; i++) {
      this.alumnosTmp[x] = this.alumnos[i]
      x++;
    }

    return true
  }
  /**
   * Cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.listarAlumnos()
  }
}
